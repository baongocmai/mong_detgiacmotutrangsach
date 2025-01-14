from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import verify_superadmin
from app.models.user import User
from app.schemas.user_schema import UserResponse, UserRoleUpdate
from app.services.superadmin_service import SuperAdminService

router = APIRouter(
    prefix="/superadmin", tags=["SuperAdmin"], dependencies=[Depends(verify_superadmin)]
)


@router.patch("/users/{user_id}/role", response_model=UserResponse)
async def update_user_role(
    user_id: int,
    role_update: UserRoleUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(verify_superadmin),
):
    """Update user role (SuperAdmin only)"""
    superadmin_service = SuperAdminService(db)
    user = await superadmin_service.update_user_role(user_id, role_update.role)
    return user


@router.get("/system/stats")
async def get_system_stats(
    db: AsyncSession = Depends(get_db), current_user: User = Depends(verify_superadmin)
):
    """Get system statistics (SuperAdmin only)"""
    superadmin_service = SuperAdminService(db)
    stats = await superadmin_service.get_system_stats()
    return stats


@router.post("/system/backup")
async def create_system_backup(
    db: AsyncSession = Depends(get_db), current_user: User = Depends(verify_superadmin)
):
    """Create system backup (SuperAdmin only)"""
    superadmin_service = SuperAdminService(db)
    backup_info = await superadmin_service.create_backup()
    return backup_info
