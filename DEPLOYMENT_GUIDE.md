# Deployment Guide: All-in-One (Render Blueprint)

This guide uses a **Blueprint** to deploy your Database, Backend, and Frontend all together on **Render**.

## Prerequisites
1.  Ensure your code is pushed to GitHub (we just did this).
2.  Sign up for [Render.com](https://render.com).

## Steps to Deploy

1.  **Dashboard**: Go to your Render Dashboard.
2.  **New Blueprint**: Click **New +** and select **Blueprint**.
3.  **Connect Repo**: Connect your `Utkarsht2310/Ai-Counsellor` repository.
4.  **Configuration**:
    *   Render will automatically detect the `render.yaml` file I created.
    *   It will show you the 3 services it's about to create:
        1.  `ai-counsellor-db` (Database)
        2.  `ai-counsellor-backend` (API)
        3.  `ai-counsellor-frontend` (Website)
5.  **Apply**: Click **Apply Blueprint**.

## What happens next?
1.  Render will start creating the Database first.
2.  Then it will build the Backend and Frontend in parallel.
3.  The **Backend** will automatically get the `DATABASE_URL`.
4.  The **Frontend** will automatically get the `VITE_API_URL` (link to the backend).

## Success
Once all checks turn **Green**, your app is live!
Click on the `ai-counsellor-frontend` service to find your **website URL**.

---
*Note: The Free tier on Render has some limitations (like "spin down" on inactivity), but it's perfect for a hackathon prototype/demo.*
