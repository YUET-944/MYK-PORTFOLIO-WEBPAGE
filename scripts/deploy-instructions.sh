#!/bin/bash

# Step 1: Download the code from v0
echo "1. Click 'Download Code' button in v0"
echo "2. Extract the downloaded ZIP file"

# Step 2: Initialize Git repository
echo "3. Open terminal in the project folder and run:"
echo "git init"
echo "git add ."
echo "git commit -m 'Initial commit: Muhammad Younas Khan Portfolio'"

# Step 3: Create GitHub repository
echo "4. Go to github.com and create a new repository named 'muhammad-younas-portfolio'"
echo "5. Connect your local repository to GitHub:"
echo "git remote add origin https://github.com/YUET-944/muhammad-younas-portfolio.git"
echo "git branch -M main"
echo "git push -u origin main"

# Step 4: Deploy to Vercel
echo "6. Go to vercel.com and sign up/login with your GitHub account"
echo "7. Click 'New Project' and import your GitHub repository"
echo "8. Vercel will automatically detect it's a Next.js project"
echo "9. Click 'Deploy' - your site will be live in minutes!"

echo "Your website will be available at: https://muhammad-younas-portfolio.vercel.app"
