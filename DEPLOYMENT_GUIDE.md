# 🚀 Deployment Guide for Muhammad Younas Khan's Portfolio

This guide will help you deploy your portfolio website to Vercel with full database functionality.

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up with GitHub)
- Supabase account (already set up)

## 🗄️ Step 1: Set Up Supabase Database

1. **Go to your Supabase project**: https://gsmegxryepqhrscbxomc.supabase.co
2. **Open the SQL Editor** in your Supabase dashboard
3. **Run the database setup script**:
   - Copy the contents of `scripts/setup-supabase-database.sql`
   - Paste it into the SQL Editor
   - Click "Run" to create all tables and initial data

## 📁 Step 2: Prepare Your Code

1. **Download your code** from v0 (if not already done)
2. **Extract the ZIP file** to your desired location
3. **Open terminal/command prompt** in the project folder

## 🔧 Step 3: Initialize Git Repository

\`\`\`bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Muhammad Younas Khan Portfolio"
\`\`\`

## 🐙 Step 4: Create GitHub Repository

1. **Go to GitHub.com** and sign in
2. **Click "New Repository"**
3. **Repository name**: `muhammad-younas-portfolio`
4. **Keep it public** (recommended for portfolio)
5. **Don't initialize** with README (we already have files)
6. **Click "Create Repository"**

## 🔗 Step 5: Connect Local Repository to GitHub

\`\`\`bash
# Add GitHub remote (replace YUET-944 with your username if different)
git remote add origin https://github.com/YUET-944/muhammad-younas-portfolio.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
\`\`\`

## 🚀 Step 6: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in with your GitHub account**
3. **Click "New Project"**
4. **Import your repository**: `muhammad-younas-portfolio`
5. **Vercel will auto-detect** it's a Next.js project
6. **Before deploying, add environment variables**:

### Environment Variables to Add in Vercel:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://gsmegxryepqhrscbxomc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzbWVneHJ5ZXBxaHJzY2J4b21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MjcxMDQsImV4cCI6MjA2OTUwMzEwNH0.e9I8zx7QaiRg9pLvOthnv-yN9E3hDEpnzNYHXszewhsGMAIL_EMAIL=mykjcs2023@gmail.com
GMAIL_APP_PASSWORD=qbim qsck hnkw ekgr
\`\`\`

7. **Click "Deploy"**

## ✅ Step 7: Verify Deployment

After deployment completes:

1. **Visit your live site** (Vercel will provide the URL)
2. **Test the contact form** - you should receive emails
3. **Test the review system** - reviews should save to database
4. **Check the admin panel** at `/admin` (username: `admin`, password: `portfolio2024`)

## 🎯 Expected Results

- ✅ **Website loads** without errors
- ✅ **Contact form works** and sends emails to mykjcs2023@gmail.com
- ✅ **Reviews system** saves to Supabase database
- ✅ **Projects load** from database
- ✅ **Admin panel** works for content management
- ✅ **Responsive design** works on all devices

## 🔧 Troubleshooting

### Build Errors
- Check the Vercel build logs
- Ensure all environment variables are set correctly
- Verify Supabase database is set up properly

### Email Not Working
- Verify Gmail app password is correct
- Check spam folder for test emails
- Ensure Gmail 2FA is enabled

### Database Issues
- Run the SQL setup script in Supabase
- Check environment variables match your Supabase project
- Verify RLS policies are set correctly

## 🎉 Success!

Your portfolio should now be live at: `https://muhammad-younas-portfolio.vercel.app`

## 📞 Support

If you encounter any issues:
1. Check the Vercel deployment logs
2. Verify all environment variables are set
3. Ensure Supabase database is properly configured
4. Test locally first with `npm run dev`

---

**Congratulations! Your professional portfolio is now live! 🎊**
