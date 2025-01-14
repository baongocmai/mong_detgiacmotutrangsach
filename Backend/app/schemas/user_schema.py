from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field

from app.models.enums import UserRole, UserStatus


class UserBase(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)


class UserCreate(UserBase):
    password: str = Field(..., min_length=6)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(UserBase):
    user_id: int
    avatar_url: Optional[str] = None
    role: UserRole
    status: UserStatus
    last_login: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class UserStatusUpdate(BaseModel):
    status: UserStatus = Field(..., description="New user status")


class UserRoleUpdate(BaseModel):
    role: UserRole = Field(..., description="New user role")


class SystemStats(BaseModel):
    total_users: int
    total_stories: int
    system_status: str


class BackupResponse(BaseModel):
    message: str
    timestamp: datetime


class AdminUserList(BaseModel):
    users: list[UserResponse]
    total: int
    skip: int
    limit: int


class AdminActionResponse(BaseModel):
    success: bool
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now())


class SuperAdminActionResponse(AdminActionResponse):
    performed_by: str
    action_type: str
