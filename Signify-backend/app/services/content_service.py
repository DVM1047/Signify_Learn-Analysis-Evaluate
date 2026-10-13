import uuid
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.core.exceptions import AppException
from app.models.content import Lesson, Sign, SignLanguage, Unit

async def get_languages(db: AsyncSession) -> list[SignLanguage]:
    result = await db.execute(select(SignLanguage))
    return list(result.scalars().all())

async def get_units(db: AsyncSession, language_id: uuid.UUID) -> list[dict]:
    result = await db.execute(
        select(Unit)
        .where(Unit.language_id == language_id)
        .options(selectinload(Unit.lessons))
        .order_by(Unit.order)
    )
    units = result.scalars().all()

    return [
        {
            "id": unit.id,
            "title": unit.title,
            "description": unit.description,
            "order": unit.order,
            "lesson_count": len(unit.lessons),
        }
        for unit in units
    ]

async def get_unit_lessons(db: AsyncSession, unit_id: uuid.UUID) -> list[Lesson]:
    result = await db.execute(
        select(Lesson)
        .where(Lesson.unit_id == unit_id)
        .options(selectinload(Lesson.signs))
        .order_by(Lesson.order)
    )
    return list(result.scalars().all())

async def get_lesson_detail(db: AsyncSession, lesson_id: uuid.UUID) -> Lesson:
    result = await db.execute(
        select(Lesson)
        .where(Lesson.id == lesson_id)
        .options(selectinload(Lesson.signs))
    )
    lesson = result.scalar_one_or_none()
    if not lesson:
        raise AppException(status_code=404, detail="Lesson not found")
    return lesson

async def search_signs(db: AsyncSession, language_id: uuid.UUID, query: str | None = None) -> list[Sign]:
    stmt = select(Sign).where(Sign.language_id == language_id)
    
    if query:
        stmt = stmt.where(Sign.word.ilike(f"%{query}%"))
        
    stmt = stmt.limit(20).order_by(Sign.word)
    result = await db.execute(stmt)
    return list(result.scalars().all())