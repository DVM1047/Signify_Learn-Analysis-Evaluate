🎨 FRONTEND ARCHITECTURE

## Project Structure

```text
signify-frontend/
│
├── package.json
├── tailwind.config.ts
├── .env.local
│
├── public/                     # Static Assets
│   ├── ml-models/              # ONNX Files for AI
│   └── images/
│
├── src/
│   ├── app/                    # Pages & Routes
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   │
│   │   ├── (auth)/             # Public Pages
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   │
│   │   ├── dashboard/          # Protected Pages
│   │   │   └── page.tsx        # Shows Units & Lessons
│   │   │
│   │   ├── lesson/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── dictionary/
│   │   │   └── page.tsx
│   │   │
│   │   ├── speed-sign/
│   │   │   └── page.tsx
│   │   │
│   │   └── profile/
│   │       └── page.tsx
│   │
│   ├── components/              # UI Building Blocks
│   │   ├── ui/                  # Buttons, Inputs, Cards
│   │   ├── layout/              # Navbar, TopStatsBar
│   │   ├── lesson/              # Question Cards, Progress Bar
│   │   ├── dictionary/          # Sign Grid Cards
│   │   └── camera/              # Webcam Viewer, Skeleton Overlay
│   │
│   ├── lib/                     # Logic & API Callers
│   │   ├── api.ts               # Axios Setup to Call Backend
│   │   └── mediapipe.ts         # Camera / ML Logic
│   │
│   └── store/                   # Global State Management
│       ├── authStore.ts         # Holds User Data & JWT
│       └── lessonStore.ts       # Tracks Current Lesson Score
```
