from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import decode_refresh_token
from app.schemas.auth_schema import TokenResponse, UserCreate, UserLogin
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(
    user_data: UserCreate,
    db: AsyncSession = Depends(get_db),
):
    auth_service = AuthService(db)
    user = await auth_service.register(user_data)
    return {"message": "User registered successfully", "user_id": user.user_id}


@router.post("/login", response_model=TokenResponse)
async def login(
    user_data: UserLogin,
    db: AsyncSession = Depends(get_db),
):
    auth_service = AuthService(db)
    user, access_token, refresh_token = await auth_service.login(user_data)
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(
    refresh_token: str,
    db: AsyncSession = Depends(get_db),
):
    payload = decode_refresh_token(refresh_token)
    auth_service = AuthService(db)
    new_access_token, new_refresh_token = await auth_service.refresh_token(
        int(payload["user_id"])
    )
    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
        "token_type": "bearer",
    }
