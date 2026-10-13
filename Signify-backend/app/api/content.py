import uuid
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_current_user
from app.database import get_db
from app.models.user import User
from app.schemas.content import LanguageResponse, LessonResponse, SignResponse, UnitResponse
from app.services import content_service

router = APIRouter(tags=["Content"])

@router.get("/languages", response_model=list[LanguageResponse])
async def get_languages(db: AsyncSession = Depends(get_db)):
    return await content_service.get_languages(db)

@router.get("/units", response_model=list[UnitResponse])
async def get_units(
    language_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user), # Requires user to be logged in
):
    return await content_service.get_units(db, language_id)

@router.get("/units/{unit_id}/lessons", response_model=list[LessonResponse])
async def get_unit_lessons(
    unit_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return await content_service.get_unit_lessons(db, unit_id)

@router.get("/lessons/{lesson_id}", response_model=LessonResponse)
async def get_lesson(
    lesson_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return await content_service.get_lesson_detail(db, lesson_id)

@router.get("/signs", response_model=list[SignResponse])
async def search_signs(
    language_id: uuid.UUID,
    q: str | None = None,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return await content_service.search_signs(db, language_id, q)