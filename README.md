# 🤟 Signify

> An interactive, AI-powered web application for learning sign language through gamification and real-time camera feedback.

![Signify Banner](https://via.placeholder.com/1000x250/3b82f6/ffffff?text=Signify+-+AI+Powered+Sign+Language+Learning)

**Signify** is a full-stack educational web application built to make learning sign language fun, accessible, and interactive. It combines structured lessons with cutting-edge, in-browser Machine Learning (Google MediaPipe + ONNX) to track hand gestures via webcam and verify signs in real time.

---

## ✨ Key Features

- 📚 **Interactive Curriculum:** Learn through structured Units, Lessons, and individual Signs.
- 📸 **Real-Time AI Feedback:** Uses your webcam to track 21 hand landmarks and verify your gestures directly in the browser.
- 🎮 **Gamification System:** Earn XP, level up, track daily learning streaks, and manage user health (hearts).
- 📖 **Learned Dictionary:** Automatically saves signs you have mastered for quick review and practice.
- ⚡ **Speed Sign Game:** A fast-paced, timed mini-game to test your gesture recognition speed and memory.

---

## 🛠️ Tech Stack

### Frontend (Web Application)

- **Framework:** Next.js (App Router) + React
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** Zustand
- **Data Fetching:** Axios + TanStack Query (React Query)
- **Machine Learning:** Google MediaPipe Hands + ONNX Runtime Web

### Backend (REST API)

- **Framework:** FastAPI (Python 3.12)
- **Database:** PostgreSQL (using `asyncpg` driver)
- **ORM:** SQLAlchemy 2.0 (Async)
- **Authentication:** JWT (JSON Web Tokens) & Google OAuth
- **Architecture:** Service-Oriented Architecture (Routes ➔ Services ➔ Database)

---

## 📂 Project Architecture

### 🐍 Backend Structure (`signify-backend`)

```text
signify-backend/
├── main.py                 # FastAPI application entry point & CORS
├── requirements.txt        # Python dependencies
├── .env                    # Environment variables (Database URL, Keys)
├── app/
│   ├── config.py           # Settings loader using Pydantic
│   ├── database.py         # SQLAlchemy Async engine & Session setup
│   ├── models/             # SQLAlchemy Database Tables
│   │   ├── user.py         # User, XP, Level, Auth Provider
│   │   ├── content.py      # Languages, Units, Lessons, Signs
│   │   ├── exercise.py     # Question types & Options
│   │   ├── progress.py     # User progress & scores
│   │   ├── dictionary.py   # Learned signs per user
│   │   └── speed_sign.py   # Timed game sessions & stats
│   ├── schemas/            # Pydantic models for API Validation
│   ├── api/                # API Endpoints (Controllers)
│   │   ├── deps.py         # Auth dependencies & Token verification
│   │   ├── auth.py         # Login, Register, Google OAuth, Password Reset
│   │   ├── content.py      # Units, Lessons, Signs APIs
│   │   ├── exercises.py    # Submissions & Progress update APIs
│   │   ├── dictionary.py   # Saved words API
│   │   └── speed_sign.py   # Speed game APIs
│   ├── services/           # Business Logic & Database Queries
│   └── core/               # Security, Passwords, JWT, Exceptions
└── scripts/
    └── seed_data.py        # Database seed script for initial content
```

### ⚛️ Frontend Structure (`signify-frontend`)

```text
signify-frontend/
├── package.json            # Node dependencies
├── tailwind.config.ts      # Tailwind CSS styling config
├── .env.local              # Frontend environment variables
├── public/
│   ├── ml-models/          # Exported ONNX gesture models
│   └── images/             # Sign graphics & visual assets
├── src/
│   ├── app/                # Next.js App Router (Pages & Layouts)
│   │   ├── (auth)/         # Public routes (Login / Register)
│   │   ├── dashboard/      # Main learning path & Units UI
│   │   ├── lesson/         # Interactive lesson player
│   │   ├── dictionary/     # Learned signs grid & review
│   │   ├── speed-sign/     # Timed game screen
│   │   └── profile/        # User stats & progress overview
│   ├── components/
│   │   ├── ui/             # Buttons, Inputs, Cards, Modals
│   │   ├── layout/         # Navbar & Top Stats Bar (XP, Level)
│   │   ├── lesson/         # Question components & Progress bar
│   │   ├── dictionary/     # Saved sign cards
│   │   └── camera/         # Webcam feed & Hand tracking overlay
│   ├── lib/
│   │   ├── api.ts          # Axios client configured with JWT
│   │   └── mediapipe.ts    # MediaPipe camera & landmark logic
│   └── store/
│       ├── authStore.ts    # Global Auth state (User, JWT token)
│       └── lessonStore.ts  # Current lesson progress state
```

---

## 🚀 Getting Started (Local Setup)

### Prerequisites

- Python 3.12 installed
- Node.js 18+ installed
- PostgreSQL installed and running

### 1. Backend Setup (`signify-backend`)

Open a terminal and navigate to the backend directory:

**PowerShell**

```powershell
cd signify-backend
```

#### Create the PostgreSQL Database

Open SQL Shell (`psql`) or pgAdmin and run:

**SQL**

```sql
CREATE DATABASE signify;
```

#### Create and Activate Python Virtual Environment

**PowerShell**

```powershell
py -3.12 -m venv venv
.\venv\Scripts\Activate.ps1
```

#### Install Dependencies

```powershell
pip install -r requirements.txt
pip install google-auth requests
```

#### Configure Environment Variables

Create a `.env` file in `signify-backend/`:

**Environment Variables**

```env
DATABASE_URL=postgresql+asyncpg://postgres:YOUR_POSTGRES_PASSWORD@localhost:5432/signify
SECRET_KEY=super-secret-key-change-this
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
GOOGLE_CLIENT_ID=your-google-client-id-if-available
```

#### Seed Initial Database Data

```powershell
python -m scripts.seed_data
```

#### Run the Backend Server

```powershell
python -m uvicorn main:app --reload
```

The backend will start at `http://127.0.0.1:8000`.

Interactive API documentation is available at:

- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

### 2. Frontend Setup (`signify-frontend`)

Navigate to the frontend directory:

```powershell
cd ../signify-frontend
```

#### Install Dependencies

```powershell
npm install
```

#### Configure Environment Variables

Create a `.env.local` file in `signify-frontend/`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
```

#### Run the Development Server

```powershell
npm run dev
```

The frontend web application will start at `http://localhost:3000`.

---

## 📅 Development Roadmap (7-Week Execution Plan)

| Phase | Backend Tasks | Frontend Tasks |
|---|---|---|
| Week 1 | FastAPI setup, PostgreSQL connection, JWT Auth, Google OAuth, Password Reset endpoints. | Next.js setup, Tailwind styling, Login & Register pages, Zustand Auth store. |
| Week 2 | DB Models & APIs for Languages, Units, Lessons, Signs. Seed script execution. | Navbar (XP/Level), Dashboard page fetching and rendering interactive Unit Cards. |
| Week 3 | Exercise fetch API, Answer validation logic, XP/Level/Progress DB update logic. | Lesson Player UI (Multiple Choice, True/False), Progress bar, Results Modal. |
| Week 4 | Endpoint to verify webcam sign predictions and issue rewards. | MediaPipe browser integration, webcam viewer component, hand landmark overlay canvas. |
| Week 5 | Auto-add mastered signs to user dictionary DB, fetch learned signs API. | "Webcam" exercise implementation in lessons. Searchable Dictionary Grid page. |
| Week 6 | Random question generator for speed game, scoring & combo multiplier API. | Speed Sign game UI, Countdown timer bar, combo counter, Big Answer buttons. |
| Week 7 | Final API testing in Swagger, database indexing, backend deployment (Render). | Mobile responsiveness check, loading state skeletons, deployment to Vercel. |

---
