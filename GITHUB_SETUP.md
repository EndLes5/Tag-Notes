# 🚀 GitHub Actions Build Guide

## Step-by-Step Instructions to Get Your APK

### 📋 Prerequisites
1. A GitHub account (free) - Sign up at https://github.com/signup
2. An Expo account (free) - Sign up at https://expo.dev/signup

---

## 🎯 Complete Setup Process

### STEP 1: Create Expo Account and Get Token

1. Go to https://expo.dev/signup and create a free account
2. Verify your email
3. Go to https://expo.dev/accounts/[your-username]/settings/access-tokens
4. Click **"Create Token"**
5. Name it: `GitHub Actions`
6. Select scope: **Read and Write**
7. Click **Create**
8. **COPY THE TOKEN** (you'll need it in Step 3) - it looks like: `expo_xxxxxxxxxxxxxxxxxxxxxx`
9. Save it somewhere safe - you can only see it once!

---

### STEP 2: Create GitHub Repository

**Option A: Using GitHub Website (Easier)**

1. Go to https://github.com/new
2. Repository name: `notepad-app`
3. Description: `My personal notepad app`
4. Select: **Public** (or Private if you prefer)
5. **DO NOT** check "Add a README file"
6. Click **"Create repository"**

**You'll see a page with instructions - keep this page open!**

---

### STEP 3: Add Expo Token to GitHub Secrets

1. In your new repository, click **"Settings"** tab (top right)
2. In left sidebar, click **"Secrets and variables"** → **"Actions"**
3. Click **"New repository secret"**
4. Name: `EXPO_TOKEN`
5. Value: Paste your Expo token from Step 1
6. Click **"Add secret"**

---

### STEP 4: Upload Your Project to GitHub

**Option A: Using GitHub Website (Easiest for Android)**

1. On your repository page, click **"uploading an existing file"**
2. Extract the NotepadApp.zip on your phone/computer
3. Drag and drop ALL files from NotepadApp folder:
   - App.js
   - package.json
   - app.json
   - babel.config.js
   - eas.json
   - .github folder (contains workflows)
   - README.md
   - QUICKSTART.md
4. Scroll down and click **"Commit changes"**

**Option B: Using GitHub Mobile App**

1. Install **GitHub** app from Play Store
2. Login to your account
3. Open your repository
4. Tap the **+** button
5. Upload files one by one

**Option C: Using Git Commands (If you have Termux or computer)**

```bash
# Navigate to your NotepadApp folder
cd NotepadApp

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Add your GitHub repository
git remote add origin https://github.com/YOUR-USERNAME/notepad-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

### STEP 5: Trigger the Build

Once files are uploaded:

1. Go to your repository on GitHub
2. Click **"Actions"** tab at the top
3. You should see **"Build Android APK"** workflow
4. Click on it
5. Click **"Run workflow"** button (right side)
6. Click the green **"Run workflow"** button
7. Wait 15-20 minutes for the build to complete

---

### STEP 6: Download Your APK

**Method 1: From Expo Dashboard**
1. Go to https://expo.dev/
2. Login
3. Click on **"notepad-app"** project
4. Click **"Builds"** tab
5. When build shows "Finished", click **"Download"**
6. Download the APK to your phone!

**Method 2: Direct Link**
- After build completes, you'll get a notification
- Check your email for Expo build notification
- Click the download link

---

## 📱 Install the APK on Your Phone

1. Download the APK file to your Android phone
2. Open the downloaded file
3. If you see "Install blocked":
   - Go to Settings → Security
   - Enable "Install unknown apps" for your browser/file manager
4. Tap **Install**
5. Open the app and enjoy! 🎉

---

## 🔧 Troubleshooting

### "Workflow not running"
- Make sure you added the EXPO_TOKEN secret correctly
- Check that the .github/workflows folder was uploaded

### "Build failed"
- Check the Actions logs for errors
- Make sure all files were uploaded correctly
- Verify your Expo token is valid

### "Can't find my build"
- Login to expo.dev
- Go to Projects → notepad-app → Builds
- Look for the most recent build

### Need to rebuild?
- Just go to Actions tab
- Click "Run workflow" again
- New APK will be generated

---

## 💡 Pro Tips

1. **Bookmark your Expo builds page**: 
   `https://expo.dev/accounts/[username]/projects/notepad-app/builds`

2. **Edit app name/icon later**:
   - Edit `app.json` file on GitHub
   - Commit changes
   - New build will trigger automatically

3. **Make updates to your app**:
   - Edit the code on GitHub (or upload new files)
   - Commit changes
   - GitHub Actions will automatically build a new version!

4. **Share your app**:
   - Share the APK download link with friends
   - They can install it too!

---

## 🎉 You're All Set!

Your notepad app will be automatically built and ready to download in about 15-20 minutes!

**Questions?** Check the GitHub Actions logs for detailed information about your build.

---

## 📊 What Happens Behind the Scenes

1. GitHub Actions starts a virtual Ubuntu server
2. Installs Node.js and Expo CLI
3. Installs your app dependencies
4. Connects to Expo's build service
5. Compiles your React Native code into native Android code
6. Creates the APK file
7. Makes it available for download on Expo dashboard

All of this happens automatically in the cloud - no setup needed on your device! 🚀
