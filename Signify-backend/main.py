from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from app.api import auth, content
from app.database import create_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create database tables on startup
    await create_tables()
    yield


app = FastAPI(
    title="SignLingo Backend",
    version="1.0.0",
    lifespan=lifespan,
)

# Allow frontend (Next.js) to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, change this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(auth.router, prefix="/api/v1")      # Phase 1
app.include_router(content.router, prefix="/api/v1")   # Phase 2  ← NEW

@app.get("/health")
async def health_check():
    return {"status": "Backend is running beautifully!"}