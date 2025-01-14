from datetime import datetime, timezone

from fastapi import HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.enums import UserRole
from app.models.story import Story
from app.models.user import User


class SuperAdminService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def update_user_role(self, user_id: int, new_role: UserRole) -> User:
        try:
            query = select(User).where(User.user_id == int(user_id))  # Convert to int
            result = await self.db.execute(query)
            user = result.scalar_one_or_none()

            if not user:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
                )

            user.role = new_role
            await self.db.commit()
            await self.db.refresh(user)
            return user
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid user ID format"
            )

    async def get_system_stats(self):
        # Get total users
        users_query = select(func.count(User.user_id))
        total_users = await self.db.execute(users_query)

        # Get total stories
        stories_query = select(func.count(Story.story_id))
        total_stories = await self.db.execute(stories_query)

        return {
            "total_users": total_users.scalar(),
            "total_stories": total_stories.scalar(),
            "system_status": "healthy",
        }

    async def create_backup(self):
        # Implement backup logic here
        return {
            "message": "Todo: Implement backup logic here",
            "timestamp": datetime.now(timezone.utc),
        }
