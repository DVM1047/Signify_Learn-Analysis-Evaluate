import uuid
from datetime import datetime
from sqlalchemy import DateTime, Integer, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    
    # Password can be null for Google users
    hashed_password: Mapped[str | None] = mapped_column(String(255), nullable=True)
    
    # Track if they used "local" (email/pass) or "google"
    auth_provider: Mapped[str] = mapped_column(String(20), default="local")
    
    xp: Mapped[int] = mapped_column(Integer, default=0)
    level: Mapped[int] = mapped_column(Integer, default=1)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())