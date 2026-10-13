⚙️ BACKEND ARCHITECTURE

## Project Structure

```text
signify-backend/
│
├── main.py
├── requirements.txt
├── .env
│
├── app/
│   ├── config.py
│   ├── database.py
│   │
│   ├── models/                  # Database Tables
│   │   ├── user.py
│   │   ├── content.py           # Units, Lessons, Signs
│   │   ├── exercise.py
│   │   ├── progress.py
│   │   ├── dictionary.py
│   │   └── speed_sign.py
│   │
│   ├── schemas/                 # Data Validation / JSON Formats
│   │   ├── auth.py
│   │   ├── content.py
│   │   ├── exercise.py
│   │   ├── progress.py
│   │   ├── dictionary.py
│   │   └── speed_sign.py
│   │
│   ├── api/                     # API Routes / Endpoints
│   │   ├── deps.py              # Security / Token Checker
│   │   ├── auth.py
│   │   ├── content.py
│   │   ├── exercises.py
│   │   ├── dictionary.py
│   │   └── speed_sign.py
│   │
│   ├── services/                # Business Logic & Database Queries
│   │   ├── auth_service.py
│   │   ├── content_service.py
│   │   ├── exercise_service.py
│   │   ├── dictionary_service.py
│   │   └── speed_sign_service.py
│   │
│   └── core/
│       ├── security.py          # JWT & Passwords
│       ├── exceptions.py
│       └── constants.py
│
└── scripts/
    └── seed_data.py             # Script to Fill DB with Initial Data
```

## Directory Overview

| Directory/File | Description |
|---|---|
| `main.py` | Application entry point |
| `requirements.txt` | Python dependencies |
| `.env` | Environment variables and configuration secrets |
| `app/config.py` | Application configuration |
| `app/database.py` | Database connection and session management |
| `app/models/` | Database models and table definitions |
| `app/schemas/` | Request validation and response schemas |
| `app/api/` | API endpoints and routing |
| `app/api/deps.py` | Authentication and authorization dependencies |
| `app/services/` | Business logic and database operations |
| `app/core/` | Security utilities, exceptions, and constants |
| `scripts/seed_data.py` | Script to populate the database with initial data |

## Main Features

- **Authentication:** User registration, login, JWT tokens, and password security.
- **Learning Content:** Units, lessons, and sign language content.
- **Exercises:** Exercises and learning activities.
- **Progress Tracking:** Track user learning progress.
- **Dictionary:** Search and retrieve sign language vocabulary.
- **Speed Sign:** Functionality for speed-based sign language activities.

## Technology Stack

- Python
- FastAPI (assuming it is the framework used)
- Database ORM (such as SQLAlchemy)
- JWT authentication
- Pydantic for data validation

*Note: The technology stack should be adjusted to match the actual dependencies in `requirements.txt`.*

## Setup

1. Clone or download the project.
2. Create and activate a Python virtual environment.
3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Configure the environment variables in `.env`.
5. Initialize the database and seed initial data if required.
6. Start the application:

   ```bash
   uvicorn main:app --reload
   ```

