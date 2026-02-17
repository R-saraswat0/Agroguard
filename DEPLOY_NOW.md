# 🚀 Quick Deployment Guide

## Step 1: Deploy Backend to Render

1. Go to https://render.com and sign in with GitHub
2. Click **"New +"** → **"Web Service"**
3. Select repository: `R-saraswat0/Agroguard`
4. Configure:
   - **Name**: `agroguard-backend`
   - **Root Directory**: `Backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   
5. Add Environment Variables (click "Advanced" → "Add Environment Variable"):
   - Copy from your local Backend/.env file
   - Add: MONGODB_URL, OPENAI_API_KEY, GEMINI_API_KEY, PORT=5557

6. Click **"Create Web Service"**
7. Wait for deployment (5-10 minutes)
8. **COPY YOUR BACKEND URL** (e.g., `https://agroguard-backend.onrender.com`)

---

## Step 2: Update Backend CORS

Before deploying frontend, you need to update CORS in your backend to allow your frontend URL.

After you get your Vercel frontend URL, add it to your backend CORS configuration.

---

## Step 3: Deploy Frontend to Vercel

### Option A: Using Vercel CLI (Recommended - Fastest)

Run these commands in your terminal:

```bash
cd Frontend
npm install -g vercel
vercel login
vercel
```

When prompted:
- Set up and deploy: **Y**
- Which scope: Select your account
- Link to existing project: **N**
- Project name: `agroguard` (or press Enter)
- In which directory is your code: **.**
- Want to override settings: **Y**
- Build Command: `npm run build`
- Output Directory: `dist`
- Development Command: `npm run dev`

Then set environment variable:
```bash
vercel env add VITE_API_URL
```
Enter your Render backend URL (e.g., `https://agroguard-backend.onrender.com`)

Deploy to production:
```bash
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com and sign in with GitHub
2. Click **"Add New"** → **"Project"**
3. Import `R-saraswat0/Agroguard`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   
5. Add Environment Variable:
   - **Name**: `VITE_API_URL`
   - **Value**: Your Render backend URL (e.g., `https://agroguard-backend.onrender.com`)

6. Click **"Deploy"**
7. Wait 2-5 minutes

---

## Step 4: Update Backend CORS

After getting your Vercel URL (e.g., `https://agroguard.vercel.app`):

1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Add new environment variable:
   ```
   FRONTEND_URL=https://agroguard.vercel.app
   ```
5. Update your backend code to use this in CORS (if not already configured)

---

## ✅ Verify Deployment

1. Visit your Vercel frontend URL
2. Test login/register
3. Test AI recommendations
4. Check if all features work

---

## 🔧 Troubleshooting

**Backend not responding:**
- Check Render logs
- Verify environment variables are set
- Ensure MongoDB connection string is correct

**Frontend can't connect to backend:**
- Check VITE_API_URL is set correctly
- Verify CORS is configured in backend
- Check browser console for errors

**Build fails:**
- Check build logs
- Ensure all dependencies are in package.json
- Verify Node version compatibility

---

## 📝 Important Notes

- Render free tier: Backend sleeps after 15 min of inactivity (first request takes ~30s)
- Keep your API keys secure
- Monitor usage to avoid unexpected charges
- Set up custom domains later if needed
