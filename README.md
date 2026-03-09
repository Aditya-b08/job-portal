# 💼 JobPortal - Full Stack MERN Job Portal

A fully functional job portal built with the MERN stack (MongoDB, Express.js, React.js, Node.js) with role-based authentication for Job Seekers and Employers.

## 🚀 Live Demo
> Deploy to Vercel + Render and add your links here

## 📸 Screenshots
> Add screenshots after running the project
<img width="1872" height="897" alt="image" src="https://github.com/user-attachments/assets/f22156ce-e31d-4b83-843d-40e3c69d8475" />
<img width="1827" height="867" alt="image" src="https://github.com/user-attachments/assets/7be9ce62-ff83-4bf7-9f33-4a8fd9478217" />
<img width="1820" height="836" alt="image" src="https://github.com/user-attachments/assets/07b656a4-24d2-4497-b1d1-141386b2d266" />
<img width="1807" height="860" alt="image" src="https://github.com/user-attachments/assets/073ce7f5-d6ab-40aa-88a4-9fb4a2b3186e" />

---

## ✨ Features

### For Job Seekers
- 🔍 Browse and search jobs with filters
- 📝 Apply to jobs with cover letter
- 📊 Track application status (Pending → Shortlisted → Hired)
- 👤 Build a complete profile with skills

### For Employers
- 📋 Post job listings with full details
- 👥 View all applicants for each job
- ✅ Update application status (shortlist / hire / reject)
- 🏢 Company profile management

### General
- 🔐 JWT Authentication (Register/Login)
- 🎨 Clean, responsive UI
- 🔎 Search & filter by location, type, category, experience

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router v6, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | JWT + bcryptjs |
| Styling | Custom CSS |
| Notifications | React Toastify |

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (free at mongodb.com/atlas)

### Step 1: Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/job-portal.git
cd job-portal
```

### Step 2: Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your MongoDB URI
npm run dev
```

### Step 3: Setup Frontend
```bash
cd ../frontend
npm install
npm start
```

### Step 4: Open in browser
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## 🗂️ Project Structure
```
job-portal/
├── backend/
│   ├── models/          # MongoDB schemas (User, Job, Application)
│   ├── routes/          # API routes (auth, jobs, applications, users)
│   ├── middleware/       # JWT auth middleware
│   └── server.js        # Express server entry point
├── frontend/
│   └── src/
│       ├── pages/       # All page components
│       ├── components/  # Reusable components (Navbar)
│       └── context/     # Auth context (global state)
└── README.md
```

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user |

### Jobs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/jobs | Get all jobs (with filters) |
| GET | /api/jobs/:id | Get job details |
| POST | /api/jobs | Post a job (employer) |
| PUT | /api/jobs/:id | Update job (employer) |
| DELETE | /api/jobs/:id | Delete job (employer) |

### Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/applications/:jobId | Apply to job |
| GET | /api/applications/my/applications | My applications |
| GET | /api/applications/job/:jobId | Job's applicants (employer) |
| PUT | /api/applications/:id/status | Update status |

---

## 🚀 Deployment

### Backend → Render (free)
1. Go to render.com → New Web Service
2. Connect your GitHub repo
3. Set root directory to `backend`
4. Add environment variables (MONGO_URI, JWT_SECRET)

### Frontend → Vercel (free)
1. Go to vercel.com → Import Project
2. Set root directory to `frontend`
3. Add env variable: `REACT_APP_API_URL=your-render-url`

---

## 👨‍💻 Author
**Your Name** - [GitHub](https://github.com/YOUR_USERNAME) | [LinkedIn](https://linkedin.com/in/YOUR_PROFILE)

---

## 📄 License
MIT License
