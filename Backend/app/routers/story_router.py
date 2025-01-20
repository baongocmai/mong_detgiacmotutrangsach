from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.story_schema import (
    StoryCreate,
    StoryFilter,
    StoryResponse,
    StoryUpdate,
)
from app.services.story_service import StoryService

router = APIRouter(prefix="/stories", tags=["Stories"])


@router.post("", response_model=StoryResponse)
async def create_story(
    story_data: StoryCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create a new story"""
    story_service = StoryService(db)
    story = await story_service.create_story(story_data, current_user.user_id)
    return story


@router.get("", response_model=list[StoryResponse])
async def get_stories(
    skip: int = 0,
    limit: int = 10,
    filters: StoryFilter = Depends(),
    db: AsyncSession = Depends(get_db),
):
    """Get all stories with filters"""
    story_service = StoryService(db)
    stories = await story_service.filter_stories(filters, skip, limit)
    return stories


@router.get("/{story_id}", response_model=StoryResponse)
async def get_story(story_id: int, db: AsyncSession = Depends(get_db)):
    """Get a specific story by ID"""
    story_service = StoryService(db)
    story = await story_service.get_story(story_id)
    return story


@router.patch("/{story_id}", response_model=StoryResponse)
async def update_story(
    story_id: int,
    story_data: StoryUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update a story"""
    story_service = StoryService(db)
    story = await story_service.update_story(story_id, story_data, current_user.user_id)
    return story


@router.delete("/{story_id}")
async def delete_story(
    story_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Delete a story"""
    story_service = StoryService(db)
    await story_service.delete_story(story_id, current_user.user_id)
    return {"message": "Story deleted successfully"}
