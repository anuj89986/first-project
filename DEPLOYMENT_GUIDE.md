# Deployment Guide - Hospital Management System

## Overview
- **Frontend**: Patient-facing website → Netlify
- **Manager**: Admin/Doctor dashboard → Netlify  
- **Backend**: API Server → Render (recommended) or Railway

---

## 📦 PART 1: Deploy Backend on Render

### Step 1: Push Code to GitHub
```bash
# If not already done
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy on Render
1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `hospital-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Step 3: Add Environment Variables
In Render dashboard, go to **Environment** tab and add:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_secret
```

### Step 4: Note Backend URL
After deployment, copy your backend URL (e.g., `https://hospital-backend-xxx.onrender.com`)

---

## 🌐 PART 2: Deploy Frontend on Netlify

### Step 1: Prepare Frontend
1. Create `.env` file in `frontend` folder with:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

### Step 2: Deploy on Netlify
1. Go to [netlify.com](https://netlify.com) and login
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub and select your repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

### Step 3: Add Environment Variables
In Netlify: **Site settings** → **Environment variables** → Add:
```
VITE_API_URL=https://your-backend-url.onrender.com
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Step 4: Deploy
Click **"Deploy site"**. Netlify will build and deploy your frontend.

---

## 👨‍💼 PART 3: Deploy Manager on Netlify

### Step 1: Prepare Manager
1. Create `.env` file in `manager` folder with:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

### Step 2: Deploy on Netlify
1. In Netlify, click **"Add new site"** → **"Import an existing project"**
2. Select the same repository
3. Configure:
   - **Base directory**: `manager`
   - **Build command**: `npm run build`
   - **Publish directory**: `manager/dist`

### Step 3: Add Environment Variables
In Netlify: **Site settings** → **Environment variables** → Add:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

### Step 4: Deploy
Click **"Deploy site"**

---

## ✅ Post-Deployment Checklist

### 1. Update Backend CORS Settings
Update your backend to allow your Netlify domains:
- Frontend URL: `https://your-frontend.netlify.app`
- Manager URL: `https://your-manager.netlify.app`

### 2. Test All Features
- [ ] User registration/login
- [ ] Doctor appointment booking
- [ ] Admin dashboard access
- [ ] Payment processing
- [ ] Image uploads

### 3. Custom Domains (Optional)
- In Netlify: **Domain settings** → **Add custom domain**
- In Render: **Settings** → **Custom domain**

---

## 🚨 Common Issues & Solutions

### Issue 1: API calls failing
**Solution**: Check CORS settings in backend and ensure environment variables are correct

### Issue 2: 404 on page refresh
**Solution**: The `netlify.toml` file handles this with redirects

### Issue 3: Environment variables not working
**Solution**: 
- Netlify: Prefix with `VITE_` for Vite apps
- Render: No prefix needed for backend

### Issue 4: Build fails
**Solution**: 
- Check Node version compatibility
- Ensure all dependencies are in `package.json`
- Check build logs for specific errors

---

## 📝 Alternative Platforms for Backend

If Render doesn't work, try:
1. **Railway.app** - Similar to Render, easy setup
2. **Heroku** - Requires credit card but has free tier
3. **Vercel** - Can handle serverless functions
4. **AWS EC2** - More complex but full control

---

## 🔄 Continuous Deployment

All platforms support automatic deployment:
- Push to GitHub → Automatically deploys
- No need to manually redeploy each time

---

## 📞 Support
If you encounter issues:
1. Check the platform's documentation
2. Review deployment logs
3. Verify environment variables
4. Test locally first with production URLs
