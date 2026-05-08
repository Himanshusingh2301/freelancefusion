# FreelanceFusion

FreelanceFusion is an ML-powered freelance marketplace where:
- clients can post and manage projects
- freelancers can create profiles, discover relevant work, take projects, and complete them
- recommendations are generated using a skill-first hybrid matching model

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS + Clerk
- **Backend:** Flask + PyMongo + Clerk JWT verification
- **Database:** MongoDB
- **ML:** `scikit-learn` (TF-IDF + hybrid skill scoring)

## Project Structure

```text
freelancefusion/
  backend/
    app.py
    routes/
    models/
    auth/
    ml/
  frontend/
    src/
```

## Core Features

### Authentication and User Roles
- Clerk authentication on frontend
- backend verifies Clerk JWT for protected APIs
- role-based flow (`client` / `freelancer`)

### Client Features
- post project
- view own projects
- edit project
- delete project

### Freelancer Features
- create/update freelancer profile
- browse recommended projects
- take a project (project status -> `ongoing`)
- mark project as completed (status -> `completed`)
- view active projects
- view work history

### ML Recommendation
- endpoint: `/freelancefusion/recommend-projects`
- scoring is skill-first hybrid:
  - required skill coverage + freelancer skill precision
  - plus small TF-IDF text similarity component
- returns `match_score` and debug fields like matched skills

## API Base

All backend routes are under:

`/freelancefusion`

## Main API Endpoints

### Auth/User
- `POST /add-user`
- `POST /update-role`
- `GET /get-user`
- `POST /update-profile`
- `GET /auth/test`

### Projects
- `POST /post-project`
- `GET /get-project`
- `GET /get-all-projects`
- `GET /get-project/<project_id>`
- `PUT /update-project/<project_id>`
- `DELETE /delete-project/<project_id>`
- `POST /take-project/<project_id>`
- `POST /complete-project/<project_id>`

### Freelancers
- `POST /post-freelancer`
- `GET /get-all-freelancers`
- `GET /get-freelancer/<freelancer_id>`
- `GET /recommend-projects`
- `GET /active-projects`
- `GET /work-history`

## Local Setup

## 1) Backend Setup

```powershell
cd "D:\Projects\college project\freelancefusion\backend"
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

Backend runs on:
- `http://127.0.0.1:5000`

## 2) Frontend Setup

```powershell
cd "D:\Projects\college project\freelancefusion\frontend"
npm install
npm run dev
```

Frontend runs on:
- `http://localhost:5173`

## Environment Variables

### Frontend (`frontend/.env`)

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_BASE_URL=http://127.0.0.1:5000/freelancefusion
```

### Backend (recommended)

Use environment variables instead of hardcoding secrets:

```env
MONGO_URI=your_mongodb_connection_string
CLERK_ISSUER=https://your-clerk-instance.accounts.dev
FRONTEND_URL=http://localhost:5173
```

## Notes

- For non-DOB date fields, past dates are blocked in frontend forms.
- Project skill matching uses `skills_required` as the canonical project skill field.
- If backend routes seem missing after changes, restart backend server.

## Future Improvements

- add project application flow (proposal/submission model)
- add role-aware footer/navbar links
- add admin moderation
- improve recommendation explainability UI (matched skills chips)
- add server-side validation for deadline/business rules

