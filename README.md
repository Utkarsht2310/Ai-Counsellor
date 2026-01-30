# AI Counsellor - Study Abroad Guidance Platform

![AI Counsellor](https://img.shields.io/badge/Status-Prototype-blue)
![Python](https://img.shields.io/badge/Python-3.11+-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-teal)

## 🚀 Project Overview

**AI Counsellor** is a guided, stage-based platform designed to help students make confident and informed study-abroad decisions. Instead of overwhelming users with listings or generic chat responses, the platform uses a structured **AI Counsellor** that deeply understands a student's academic background, goals, budget, and readiness, and then guides them step by step from profile building to university shortlisting and application preparation.

### Key Features

- 🎯 **Guided Onboarding** - Structured profile creation to understand student background
- 🤖 **AI-Powered Counselling** - Intelligent recommendations based on student profile
- 🎓 **University Shortlisting** - Categorized recommendations (Dream, Target, Safe)
- 📊 **Dashboard** - Centralized view of profile strength and progress
- ✅ **Task Management** - AI-generated to-do lists for application preparation
- 🔐 **Secure Authentication** - User registration and login system

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Database Setup](#-database-setup)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Relational database
- **Pydantic** - Data validation using Python type annotations
- **Google Generative AI** - AI-powered counselling features
- **Passlib** - Password hashing and verification

### Frontend
- **React** - JavaScript library for building user interfaces
- **Vite** - Next-generation frontend tooling
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests

---

## 📁 Project Structure

```
AI-Counsellor-Prototype/
├── backend/
│   ├── app/
│   │   ├── routes/          # API route handlers
│   │   │   ├── auth.py      # Authentication endpoints
│   │   │   ├── profile.py   # User profile endpoints
│   │   │   ├── ai.py        # AI counsellor endpoints
│   │   │   └── universities.py  # University data endpoints
│   │   ├── models.py        # Database models
│   │   ├── database.py      # Database configuration
│   │   └── main.py          # FastAPI application entry point
│   ├── seed.py              # Database seeding script
│   ├── requirements.txt     # Python dependencies
│   ├── .env                 # Environment variables (not in git)
│   └── Procfile             # Deployment configuration
├── frontend/
│   ├── src/
│   │   ├── api/             # API client functions
│   │   ├── components/      # Reusable React components
│   │   ├── context/         # React context providers
│   │   ├── pages/           # Page components
│   │   ├── styles/          # CSS stylesheets
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Application entry point
│   ├── package.json         # Node.js dependencies
│   ├── vite.config.js       # Vite configuration
│   └── vercel.json          # Vercel deployment config
├── render.yaml              # Render deployment blueprint
├── docker-compose.yml       # Docker configuration
└── README.md                # This file
```

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.11+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 18+** and **npm** - [Download Node.js](https://nodejs.org/)
- **PostgreSQL 14+** - [Download PostgreSQL](https://www.postgresql.org/download/)
- **Git** - [Download Git](https://git-scm.com/downloads)

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Utkarsht2310/Ai-Counsellor.git
cd AI-Counsellor-Prototype
```

### 2. Backend Setup

#### Create and Activate Virtual Environment

**Windows:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

#### Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/ai_counsellor

# Google Generative AI API Key
GEMINI_API_KEY=your_google_gemini_api_key_here

# Application Settings
SECRET_KEY=your_secret_key_here
```

**Important:**
- Replace `username` and `password` with your PostgreSQL credentials
- Replace `your_google_gemini_api_key_here` with your actual Google Gemini API key
- Generate a secure `SECRET_KEY` (you can use: `python -c "import secrets; print(secrets.token_hex(32))"`)

### Frontend Configuration

If your backend runs on a different port or host, update the API base URL in `frontend/src/api/authApi.js` and other API files.

---

## 🚀 Running the Application

### 1. Start PostgreSQL Database

Ensure PostgreSQL is running on your system.

**Create Database:**
```bash
psql -U postgres
CREATE DATABASE ai_counsellor;
\q
```

### 2. Seed the Database (Optional)

Populate the database with sample university data:

```bash
cd backend
python seed.py
```

### 3. Start the Backend Server

```bash
cd backend
# Make sure virtual environment is activated
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at: `http://localhost:8000`

### 4. Start the Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will be available at: `http://localhost:5173`

### 5. Access the Application

Open your browser and navigate to `http://localhost:5173`

---

## 🗄️ Database Setup

### Database Tables

The application automatically creates the following tables on startup:

- **users** - User authentication and profile data
- **universities** - University information and metadata
- **user_profiles** - Extended user profile information
- **shortlisted_universities** - User's shortlisted universities
- **tasks** - User's to-do items

### Manual Database Migration

If you need to reset the database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Drop and recreate database
DROP DATABASE ai_counsellor;
CREATE DATABASE ai_counsellor;
\q

# Run the application to recreate tables
cd backend
python -c "from app.database import engine, Base; Base.metadata.create_all(bind=engine)"

# Seed data
python seed.py
```

---

## 📚 API Documentation

Once the backend is running, access the interactive API documentation:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Key API Endpoints

#### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - User login

#### Profile
- `GET /profile/me` - Get current user profile
- `PUT /profile/update` - Update user profile

#### AI Counsellor
- `POST /ai/chat` - Chat with AI counsellor
- `POST /ai/recommend` - Get university recommendations

#### Universities
- `GET /universities` - List all universities
- `GET /universities/{id}` - Get university details
- `POST /universities/shortlist` - Shortlist a university

---

## 🌐 Deployment

### Deployment Options

This project can be deployed using:

1. **Render** - See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions
2. **Docker** - Use the included `docker-compose.yml`
3. **Vercel** (Frontend) + Render (Backend)

### Quick Deploy with Render

1. Fork this repository
2. Create a new Web Service on [Render](https://render.com)
3. Connect your repository
4. Render will automatically detect the `render.yaml` blueprint
5. Add environment variables in the Render dashboard
6. Deploy!

### Environment Variables for Production

Ensure the following environment variables are set in your production environment:

- `DATABASE_URL` - PostgreSQL connection string
- `GEMINI_API_KEY` - Google Gemini API key
- `SECRET_KEY` - Application secret key
- `FRONTEND_URL` - Frontend URL for CORS configuration

---

## 🐛 Troubleshooting

### Common Issues

#### Backend won't start

**Error: `ModuleNotFoundError: No module named 'fastapi'`**
```bash
# Ensure virtual environment is activated and dependencies are installed
pip install -r requirements.txt
```

**Error: Database connection failed**
```bash
# Check PostgreSQL is running
# Verify DATABASE_URL in .env file
# Ensure database exists
psql -U postgres -c "CREATE DATABASE ai_counsellor;"
```

#### Frontend won't start

**Error: `Cannot find module`**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error: API requests failing**
- Check backend is running on `http://localhost:8000`
- Verify CORS settings in `backend/app/main.py`
- Check browser console for detailed error messages

#### Database Issues

**Error: `relation "users" does not exist`**
```bash
# Tables not created - restart backend to auto-create tables
# Or manually create them:
cd backend
python -c "from app.database import engine, Base; Base.metadata.create_all(bind=engine)"
```

### Getting Help

If you encounter issues:

1. Check the [Issues](https://github.com/Utkarsht2310/Ai-Counsellor/issues) page
2. Review API logs in the terminal
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly

---

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is a hackathon prototype and is provided as-is for educational purposes.

---

## 🙏 Acknowledgments

- Google Gemini AI for powering the AI counsellor features
- FastAPI for the excellent backend framework
- React and Vite for the modern frontend development experience

---

## 📞 Contact

For questions or support, please open an issue on the [GitHub repository](https://github.com/Utkarsht2310/Ai-Counsellor).

---

**Built with ❤️ for students pursuing their study abroad dreams**
