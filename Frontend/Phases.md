# 📅 Frontend Weekly Phases (7 Weeks)

## Week 1: Setup & Authentication UI

- Initialize Next.js and Tailwind CSS.
- Create the UI for the Login and Register pages.
- Write Axios functions to call the Backend Auth APIs.
- Save the JWT token into local storage using Zustand.

## Week 2: App Shell & Dashboard

- Build the main Navigation Bar (showing the user's XP and Level).
- Build the Dashboard page that fetches the Units and Lessons from the backend.
- Display them as clickable cards.

## Week 3: Basic Lesson Player

- Build the UI for standard exercises (Multiple Choice buttons, True/False buttons).
- Add a top progress bar.
- Build the logic to cycle through questions, send answers to the backend, and show the "Lesson Complete" summary screen.

## Week 4: Camera & ML Integration

- Integrate Google MediaPipe into the browser.
- Build a component that turns on the user's webcam.
- Draw dots on their hand (tracking) and convert those dots into data for the ONNX model to predict the sign.

## Week 5: Camera Exercises & Dictionary

- Add the new "Webcam" exercise type into the Lesson Player.
- Build the Dictionary page UI: a simple, searchable grid of cards showing all the signs the user has successfully learned.

## Week 6: Speed Sign Game UI

- Build a fast-paced game screen.
- Include a visual countdown timer bar, big answer buttons, and a combo counter.
- Connect this UI to the backend's Speed Sign endpoints.

## Week 7: Polish & Deployment

- Ensure the website looks good on both desktop and mobile screens.
- Add loading spinners and error messages.
- Deploy the frontend to Vercel (free hosting) and connect it to the live backend.
