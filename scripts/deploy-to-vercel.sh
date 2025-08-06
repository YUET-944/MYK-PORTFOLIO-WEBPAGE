#!/bin/bash

echo "🚀 Deploying Muhammad Younas Khan's Portfolio to Vercel"
echo "=================================================="

# Step 1: Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project root directory."
    exit 1
fi

# Step 2: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 3: Build the project locally to check for errors
echo "🔨 Building project locally..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi

echo "✅ Local build successful!"

# Step 4: Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "🔧 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Muhammad Younas Khan Portfolio"
fi

# Step 5: Instructions for GitHub setup
echo ""
echo "📋 Next Steps:"
echo "1. Create a new repository on GitHub named 'muhammad-younas-portfolio'"
echo "2. Run these commands:"
echo "   git remote add origin https://github.com/YUET-944/muhammad-younas-portfolio.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Go to vercel.com and:"
echo "   - Sign in with your GitHub account"
echo "   - Click 'New Project'"
echo "   - Import your GitHub repository"
echo "   - Add these environment variables in Vercel:"
echo ""
echo "   NEXT_PUBLIC_SUPABASE_URL=https://gsmegxryepqhrscbxomc.supabase.co"
echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzbWVneHJ5ZXBxaHJzY2J4b21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MjcxMDQsImV4cCI6MjA2OTUwMzEwNH0.e9I8zx7QaiRg9pLvOthnv-yN9E3hDEpnzNYHXszewhsGMAIL_EMAIL=mykjcs2023@gmail.com"
echo "   GMAIL_APP_PASSWORD=qbim qsck hnkw ekgr"
echo ""
echo "4. Click 'Deploy' and your site will be live!"
echo ""
echo "🎉 Your portfolio will be available at: https://muhammad-younas-portfolio.vercel.app"
