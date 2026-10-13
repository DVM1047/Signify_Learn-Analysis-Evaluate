# 📅 Backend Weekly Phases (7 Weeks)

## Week 1: Setup & Auth 

- Set up FastAPI project structure.
- Connect PostgreSQL database.
- Create User tables.
- Implement JWT-based login and registration.
- Add Google Authentication support.
- Add Forgot Password / Reset Password logic.

## Week 2: Content System 

- Create database tables for Sign Languages, Units, Lessons, and Signs.
- Write API endpoints for the frontend to fetch the curriculum.
- Write the seed script to populate the database with initial data.

## Week 3: Exercises & Progress

- Create APIs that fetch the specific questions for a lesson.
- Build logic to check if a user's submitted answer is correct.
- Write database queries to update the user's XP, Level, and Lesson Completion status.

## Week 4: ML Verification API

- Create a special API endpoint that receives the "predicted sign" and "confidence score" from the frontend's webcam.
- Validate if the prediction matches the required exercise answer and award points.

## Week 5: Learned Dictionary

- Build logic that automatically saves a sign to the database under a specific user once they answer it correctly.
- Create an API for the frontend to fetch a user's customized list of learned words.

## Week 6: Speed Sign Game

- Build APIs to generate 10 random timed questions.
- Create an endpoint to receive the final score, calculate combo multipliers, and save the game session to the database.

## Week 7: Polish & Deployment

- Clean up any bugs and test all endpoints via Swagger.
- Deploy the backend to a cloud provider (Render or Railway) along with a cloud PostgreSQL database.
