# 🎯 JobMatch - Full Stack Job Matching Platform

**JobMatch** is a MERN-based web application built as part of a college software engineering assignment. It connects **students** looking for job opportunities with **employers** offering internships or positions. The system includes a separate **admin panel**, **role-based profiles**, **Job Apply**, **Profile completion**.

---

## 📁 Folder Structure

```bash
jobMatch/
├── Client/
│   ├── admin/                    # Static HTML admin UI
│   │   ├── admin-login.html
│   │   └── admin-panel.html
│   └── JobMatchFrontend/         # React frontend code
├── config/                       # MongoDB and server config files
├── middleware/                   # Auth, validation, etc.
├── models/                       # Mongoose schema models
│   ├── Admin.js
│   ├── EmployerProfile.js
│   ├── Job.js
│   ├── Message.js
│   ├── StudentProfile.js
│   └── User.js
├── routes/                       # API route handlers
│   ├── admin.js
│   ├── auth.js
│   ├── chat.js
│   ├── employer.js
│   ├── job.js
│   └── student.js
├── uploads/                      # Uploaded files (e.g., CVs)
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js                     # Express.js entry point
```

## 🛠️ Tech Stack

### ✅ Frontend
- React.js
- Tailwind CSS
- HTML/CSS (Static admin panel)

### ✅ Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Bansnetsajak007/jobMatch.git
cd jobMatch
```

### 2. Install backend dependencies
```bash
npm install
```

### 3. Run the backend server
```bash
node server.js
```

### 4. Start the frontend (React)
```bash
cd Client/JobMatchFrontend
npm install
npm run dev
```

## 👤 User Roles & Features

### 🧑‍🎓 Student
- Sign up / Login
- Create and update student profile
- Browse available jobs
- Apply for jobs

### 🧑‍💼 Employer
- Register and log in
- Create employer profile
- Post new job listings
- View applicants

### 🛠️ Admin
- Login via static HTML UI
- Access admin dashboard
- View All Users , Delete Them


## 🌐 Deployment (Optional for Assignment)

App is Deployed on : [jobmatch-flame.vercel.app](https://jobmatch-flame.vercel.app/)

### Frontend
- Deployed on Vercel 

### Backend
- Deployed on Render
- MongoDB Atlas for cloud DB

## 📹 Demo Video

Watch the complete 6-minute demo of JobMatch application:

🎥 [View Demo Video](https://drive.google.com/file/d/1b16F23fFw1kEG268qOzmEa68wrghWmo3/view?usp=drive_link)

The video includes:
- Student dashboard walkthrough
- Employer job posting process
- Admin panel overview


## 📌 Future Improvements

- ✅ Admin dashboard full functionality using React
- ✅ Pagination for job lists
- ✅ Advanced chat features (real-time using Socket.IO)
- ✅ Email notifications
- ✅ Advance Application Review
