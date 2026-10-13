from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.exceptions import BadRequestException, UnauthorizedException
from app.core.security import create_access_token, hash_password, verify_password
from app.models.user import User
from app.schemas.auth import TokenResponse

import uuid
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from app.config import settings

async def register_user(db: AsyncSession, email: str, username: str, password: str) -> TokenResponse:
    # Check if user exists
    result = await db.execute(select(User).where(or_(User.email == email, User.username == username)))
    if result.scalar_one_or_none():
        raise BadRequestException("Email or username already taken")

    # Create new user
    user = User(
        email=email,
        username=username,
        hashed_password=hash_password(password)
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    # Generate token
    access_token = create_access_token(str(user.id))
    return TokenResponse(access_token=access_token, user_id=user.id, username=user.username)


async def authenticate_user(db: AsyncSession, email: str, password: str) -> TokenResponse:
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()

    if not user or not verify_password(password, user.hashed_password):
        raise UnauthorizedException("Invalid credentials")

    access_token = create_access_token(str(user.id))
    return TokenResponse(access_token=access_token, user_id=user.id, username=user.username)

async def authenticate_google_user(db: AsyncSession, token: str) -> TokenResponse:
    try:
        # Verify the token with Google
        idinfo = id_token.verify_oauth2_token(
            token, 
            google_requests.Request(), 
            settings.GOOGLE_CLIENT_ID
        )
        email = idinfo['email']
        
        # Create a base username from their email (e.g. john.doe@gmail.com -> john.doe)
        base_username = email.split('@')[0]
        
    except ValueError:
        raise UnauthorizedException("Invalid Google Token")

    # Check if user already exists
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()

    if not user:
        # Check if username is taken by someone else, if so, append random string
        username_check = await db.execute(select(User).where(User.username == base_username))
        if username_check.scalar_one_or_none():
            base_username = f"{base_username}_{str(uuid.uuid4())[:6]}"

        # Create new Google user
        user = User(
            email=email,
            username=base_username,
            hashed_password=None,  # No password!
            auth_provider="google"
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)

    # Generate our own JWT token for the frontend to use
    access_token = create_access_token(str(user.id))
    return TokenResponse(access_token=access_token, user_id=user.id, username=user.username)