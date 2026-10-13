import uuid
from pydantic import BaseModel

class LanguageResponse(BaseModel):
    id: uuid.UUID
    code: str
    name: str
    description: str | None

    model_config = {"from_attributes": True}

class SignResponse(BaseModel):
    id: uuid.UUID
    word: str
    description: str | None
    category: str
    difficulty: str
    video_url: str | None
    image_url: str | None

    model_config = {"from_attributes": True}

class LessonResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: str | None
    order: int
    xp_reward: int
    signs: list[SignResponse] = []

    model_config = {"from_attributes": True}

class UnitResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: str | None
    order: int
    lesson_count: int = 0

    model_config = {"from_attributes": True}