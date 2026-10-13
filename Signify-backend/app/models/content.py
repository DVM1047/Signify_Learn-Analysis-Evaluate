import uuid
from datetime import datetime
from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base

class SignLanguage(Base):
    __tablename__ = "sign_languages"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code: Mapped[str] = mapped_column(String(10), unique=True)  # asl, bsl, isl
    name: Mapped[str] = mapped_column(String(100))
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    units: Mapped[list["Unit"]] = relationship(back_populates="language")

class Unit(Base):
    __tablename__ = "units"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    language_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("sign_languages.id"))
    title: Mapped[str] = mapped_column(String(200))
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    order: Mapped[int] = mapped_column(Integer)

    language: Mapped["SignLanguage"] = relationship(back_populates="units")
    lessons: Mapped[list["Lesson"]] = relationship(back_populates="unit")

class Lesson(Base):
    __tablename__ = "lessons"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    unit_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("units.id"))
    title: Mapped[str] = mapped_column(String(200))
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    order: Mapped[int] = mapped_column(Integer)
    xp_reward: Mapped[int] = mapped_column(Integer, default=10)

    unit: Mapped["Unit"] = relationship(back_populates="lessons")
    signs: Mapped[list["Sign"]] = relationship(secondary="lesson_signs", back_populates="lessons")

class Sign(Base):
    __tablename__ = "signs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    language_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("sign_languages.id"))
    word: Mapped[str] = mapped_column(String(200), index=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    category: Mapped[str] = mapped_column(String(50), default="general")
    difficulty: Mapped[str] = mapped_column(String(20), default="beginner")
    
    video_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    lessons: Mapped[list["Lesson"]] = relationship(secondary="lesson_signs", back_populates="signs")

class LessonSign(Base):
    __tablename__ = "lesson_signs"

    lesson_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("lessons.id"), primary_key=True)
    sign_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("signs.id"), primary_key=True)
    order: Mapped[int] = mapped_column(Integer, default=0)