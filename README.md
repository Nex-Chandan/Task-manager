# Task Manager — MERN Stack

A full-stack Task Management Web Application built with MongoDB, Express.js, React.js, and Node.js. Features secure JWT authentication, full CRUD operations, and a clean responsive UI built with Tailwind CSS.

---

## Screenshots

live->   https://grand-lolly-8b7ab4.netlify.app/

---

## Features

- User Registration & Login with JWT Authentication
- Create, Edit, Delete Tasks
- Mark tasks as Completed or Pending
- Search tasks by title
- Filter tasks by status (All / Pending / Completed)
- Task stats dashboard (Total / Pending / Completed)
- Protected routes — dashboard only accessible after login
- Fully responsive UI with Tailwind CSS
- Toast notifications for all actions

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React.js, React Router, Axios, Tailwind CSS |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB, Mongoose                 |
| Auth       | JWT (jsonwebtoken), bcryptjs      |
| Notifications | react-toastify                 |

---

## Project Structure

```
task-manager/
│
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Register, Login, GetMe
│   │   └── taskController.js      # CRUD + Toggle status
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT protect middleware
│   ├── models/
│   │   ├── User.js                # User schema
│   │   └── Task.js                # Task schema
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth/*
│   │   └── taskRoutes.js          # /api/tasks/*
│   ├── utils/
│   │   └── generateToken.js       # JWT sign helper
│   ├── .env                       # Environment variables
│   ├── .env.example               # Example env file
│   ├── package.json
│   └── server.js                  # Entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── api/
    │   │   └── api.js             # Axios instance + all API calls
    │   ├── components/
    │   │   ├── Navbar.js          # Top navigation bar
    │   │   ├── TaskCard.js        # Single task display
    │   │   ├── TaskForm.js        # Add / Edit task form
    │   │   └── PrivateRoute.js    # Protect dashboard route
    │   ├── context/
    │   │   └── AuthContext.js     # Global auth state
    │   ├── pages/
    │   │   ├── Login.js           # Login page
    │   │   ├── Register.js        # Register page
    │   │   └── Dashboard.js       # Main task dashboard
    │   ├── App.js                 # Routes setup
    │   ├── index.js               # React entry point
    │   └── index.css              # Tailwind directives
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

---

## Setup Instructions

### Prerequisites
- Node.js v16 or above
- MongoDB Atlas account (or local MongoDB)
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```bash
cp .env.example .env
```

Fill in your `.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

Backend runs on **http://localhost:5000**

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs on **http://localhost:3000**

---

## API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint         | Description            | Auth     |
|--------|------------------|------------------------|----------|
| POST   | `/register`      | Register new user      | Public   |
| POST   | `/login`         | Login user, get token  | Public   |
| GET    | `/me`            | Get logged-in user     | Private |

### Task Routes — `/api/tasks`

| Method | Endpoint          | Description              | Auth       |
|--------|-------------------|--------------------------|------------|
| GET    | `/`               | Get all tasks of user    | Private |
| POST   | `/`               | Create new task          | Private |
| GET    | `/:id`            | Get single task          | Private |
| PUT    | `/:id`            | Update task              | Private |
| PATCH  | `/:id/status`     | Toggle pending/completed | Private |
| DELETE | `/:id`            | Delete task              | Private |

---

## Database Schemas

### User Schema
```js
{
  name:      String,   // required
  email:     String,   // required, unique
  password:  String,   // required, hashed with bcrypt
  createdAt: Date,
  updatedAt: Date
}
```

### Task Schema
```js
{
  title:       String,   // required
  description: String,   // optional
  status:      String,   // "pending" | "completed"
  userId:      ObjectId, // ref to User
  createdAt:   Date,
  updatedAt:   Date
}
```

---

## Git Branching Strategy

This project follows **GitHub Flow** with a `main` and `develop` branch.

```
main
└── develop
    ├── feature/backend-setup
    ├── feature/user-model
    ├── feature/auth-routes
    ├── feature/task-model
    ├── feature/task-crud
    ├── feature/frontend-setup
    ├── feature/auth-context
    ├── feature/register-page
    ├── feature/login-page
    ├── feature/private-route
    ├── feature/navbar
    ├── feature/task-form
    ├── feature/task-card
    └── feature/dashboard
```

---

## Dependencies

### Backend
| Package        | Purpose                  |
|----------------|--------------------------|
| express        | Web framework            |
| mongoose       | MongoDB ODM              |
| bcryptjs       | Password hashing         |
| jsonwebtoken   | JWT authentication       |
| dotenv         | Environment variables    |
| cors           | Cross-origin requests    |
| nodemon        | Dev auto-restart         |

### Frontend
| Package          | Purpose                  |
|------------------|--------------------------|
| react            | UI library               |
| react-router-dom | Client-side routing      |
| axios            | HTTP requests            |
| tailwindcss      | Utility-first CSS        |
| react-toastify   | Toast notifications      |

---
