# Deployment Guide: AI Counsellor

This guide will help you deploy your full-stack application for free.

**Strategy:**
- **Backend & Database**: [Render](https://render.com) (Free Web Service + Free PostgreSQL)
- **Frontend**: [Vercel](https://vercel.com) (Free Static Hosting)

---

## Part 1: Deploy Database & Backend (Render)

1.  **Sign Up/Login** to [Render.com](https://render.com) using your GitHub account.

### Step 1.1: Create the Database
1.  Click **New +** and select **PostgreSQL**.
2.  **Name**: `ai-counsellor-db` (or similar).
3.  **Region**: Choose the one closest to you (e.g., Singapore, Frankfurt, Oregon).
4.  **Instance Type**: Select **Free**.
5.  Click **Create Database**.
6.  **Wait** for it to be created. Once available, look for the **Internal Database URL**.
    *   *Copy this URL. You will need it for the backend.*

### Step 1.2: Deploy the Backend
1.  Click **New +** and select **Web Service**.
2.  Select **Build and deploy from a Git repository**.
3.  Connect your GitHub account if asked, and select your repo: `Utkarsht2310/Ai-Counsellor`.
4.  **Name**: `ai-counsellor-api`.
5.  **Region**: Same as your database.
6.  **Branch**: `main`.
7.  **Root Directory**: `backend` (Important!).
8.  **Runtime**: Python 3.
9.  **Build Command**: `pip install -r requirements.txt`.
10. **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
11. **Instance Type**: Select **Free**.
12. **Environment Variables**:
    *   Scroll down to "Advanced" or "Environment".
    *   Add Variable -> Key: `DATABASE_URL` | Value: (Paste the **Internal Database URL** from Step 1.1).
    *   (Optional) If you have a Google Gemini Key:
        *   Key: `GOOGLE_API_KEY` | Value: (Your API Key).
13. Click **Create Web Service**.

*Note: The free tier on Render puts code to "sleep" after inactivity. The first request might take 50 seconds to wake up.*

**Copy your Backend URL**: Once deployed, you will see a URL like `https://ai-counsellor-api.onrender.com`. Copy this!

---

## Part 2: Deploy Frontend (Vercel)

1.  **Sign Up/Login** to [Vercel.com](https://vercel.com) using GitHub.
2.  Click **Add New...** -> **Project**.
3.  Import your repository `Utkarsht2310/Ai-Counsellor`.
4.  **Configure Project**:
    *   **Framework Preset**: It should auto-detect **Vite**.
    *   **Root Directory**: Click **Edit** and select the `frontend` folder.
    *   **Environment Variables**:
        *   Key: `VITE_API_URL`
        *   Value: (Paste your **Render Backend URL**, e.g., `https://ai-counsellor-api.onrender.com`) - *Make sure to remove any trailing slash `/`*
5.  Click **Deploy**.

---

## Part 3: Final Checks

1.  Wait for Vercel to finish. It will give you a domain (e.g., `ai-counsellor.vercel.app`).
2.  Visit the URL.
3.  Try to **Sign Up** or **Login**.
    *   *Remember: If the backend was asleep, the first login attempt might timeout or be slow. Try again after 1 minute.*

**Success!** Your app is now live.
