from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import verify_admin
from app.models.user import User
from app.schemas.user_schema import UserResponse, UserStatusUpdate
from app.services.admin_service import AdminService

router = APIRouter(
    prefix="/admin", tags=["Admin"], dependencies=[Depends(verify_admin)]
)


@router.get("/users", response_model=list[UserResponse])
async def get_all_users(
    skip: int = 0,
    limit: int = 10,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(verify_admin),
):
    """Get all users (Admin only)"""
    admin_service = AdminService(db)
    users = await admin_service.get_all_users(skip, limit)
    return users


@router.patch("/users/{user_id}/status", response_model=UserResponse)
async def update_user_status(
    user_id: int,
    status_update: UserStatusUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(verify_admin),
):
    """Update user status (Admin only)"""
    admin_service = AdminService(db)
    user = await admin_service.update_user_status(user_id, status_update.status)
    return user


@router.delete("/users/{user_id}")
async def delete_user(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(verify_admin),
):
    """Delete user (Admin only)"""
    admin_service = AdminService(db)
    await admin_service.delete_user(user_id)
    return {"message": "User deleted successfully"}
