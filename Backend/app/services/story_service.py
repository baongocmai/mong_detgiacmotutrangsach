from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload

from app.models.category import Category
from app.models.story import Story
from app.schemas.story_schema import StoryCreate, StoryFilter, StoryUpdate
from app.utils.slug import create_unique_slug


class StoryService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_story(self, story_data: StoryCreate, user_id: int) -> Story:
        try:
            # Create slug from title
            slug = await create_unique_slug(self.db, Story, story_data.title)

            # Create story
            story = Story(
                user_id=user_id,
                slug=slug,
                **story_data.model_dump(exclude={"category_ids"}),
            )

            # Add categories if provided
            if story_data.category_ids:
                categories = await self._get_categories(story_data.category_ids)
                story.categories.extend(categories)

            self.db.add(story)
            await self.db.commit()
            await self.db.refresh(story)
            return story
        except Exception as e:
            await self.db.rollback()
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    async def get_story(self, story_id: int) -> Story:
        query = (
            select(Story)
            .options(selectinload(Story.categories), selectinload(Story.chapters))
            .where(Story.story_id == story_id)
        )
        result = await self.db.execute(query)
        story = result.scalar_one_or_none()

        if not story:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Story not found"
            )
        return story

    async def filter_stories(
        self, filters: StoryFilter, skip: int = 0, limit: int = 10
    ) -> list[Story]:
        query = select(Story).options(
            selectinload(Story.categories), selectinload(Story.chapters)
        )

        # Apply filters
        if filters.keyword:
            query = query.filter(
                Story.title.ilike(f"%{filters.keyword}%")
                | Story.description.ilike(f"%{filters.keyword}%")
            )
        if filters.category_id:
            query = query.join(Story.categories).filter(
                Category.category_id == filters.category_id
            )
        if filters.status:
            query = query.filter(Story.status == filters.status)

        # Apply pagination
        query = query.offset(skip).limit(limit)

        result = await self.db.execute(query)
        return result.scalars().unique().all()

    async def update_story(
        self, story_id: int, story_data: StoryUpdate, user_id: int
    ) -> Story:
        story = await self.get_story(story_id)

        if story.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to update this story",
            )

        # Update story fields
        for field, value in story_data.model_dump(exclude_unset=True).items():
            if field == "category_ids" and value is not None:
                categories = await self._get_categories(value)
                story.categories = categories
            else:
                setattr(story, field, value)

        await self.db.commit()
        await self.db.refresh(story)
        return story

    async def delete_story(self, story_id: int, user_id: int):
        story = await self.get_story(story_id)

        if story.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to delete this story",
            )

        await self.db.delete(story)
        await self.db.commit()

    async def _get_categories(self, category_ids: list[int]) -> list[Category]:
        query = select(Category).where(Category.category_id.in_(category_ids))
        result = await self.db.execute(query)
        categories = result.scalars().all()

        if len(categories) != len(category_ids):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="One or more categories not found",
            )
        return categories
