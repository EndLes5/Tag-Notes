# ✅ QUICK CHECKLIST - Get Your APK in 6 Steps

Print this or keep it open while you work!

---

## □ STEP 1: Create Accounts (5 minutes)

- [ ] Go to https://expo.dev/signup
- [ ] Create Expo account
- [ ] Verify email
- [ ] Go to https://github.com/signup  
- [ ] Create GitHub account
- [ ] Verify email

---

## □ STEP 2: Get Expo Token (2 minutes)

- [ ] Login to https://expo.dev/
- [ ] Go to Settings → Access Tokens
- [ ] Click "Create Token"
- [ ] Name: "GitHub Actions"
- [ ] Click Create
- [ ] **COPY the token** (starts with expo_...)
- [ ] Save it in Notes app (you'll need it soon!)

---

## □ STEP 3: Create GitHub Repository (2 minutes)

- [ ] Go to https://github.com/new
- [ ] Repository name: `notepad-app`
- [ ] Select: Public
- [ ] Click "Create repository"
- [ ] **Keep this page open!**

---

## □ STEP 4: Add Secret to GitHub (1 minute)

- [ ] In your repository, click "Settings" tab
- [ ] Click "Secrets and variables" → "Actions"
- [ ] Click "New repository secret"
- [ ] Name: `EXPO_TOKEN`
- [ ] Value: Paste your Expo token from Step 2
- [ ] Click "Add secret"

---

## □ STEP 5: Upload Files (3 minutes)

- [ ] Extract NotepadApp.zip on your phone
- [ ] Go back to your repository main page
- [ ] Click "uploading an existing file"
- [ ] Upload ALL files from NotepadApp folder:
  - [ ] App.js
  - [ ] package.json
  - [ ] app.json
  - [ ] babel.config.js
  - [ ] eas.json
  - [ ] .github folder (very important!)
  - [ ] README.md
  - [ ] QUICKSTART.md
  - [ ] GITHUB_SETUP.md
- [ ] Click "Commit changes"

---

## □ STEP 6: Start the Build (1 minute)

- [ ] Click "Actions" tab in your repository
- [ ] Click on "Build Android APK"
- [ ] Click "Run workflow" button (green)
- [ ] Click "Run workflow" again
- [ ] Wait 15-20 minutes ⏰

---

## □ STEP 7: Download APK (2 minutes)

- [ ] Go to https://expo.dev/
- [ ] Login
- [ ] Click your project "notepad-app"
- [ ] Click "Builds" tab
- [ ] Wait for "Finished" status
- [ ] Click "Download"
- [ ] Save APK to your phone

---

## □ STEP 8: Install App (1 minute)

- [ ] Open the downloaded APK file
- [ ] Allow "Install from unknown sources" if asked
- [ ] Click Install
- [ ] Open your new app! 🎉

---

## ⏱️ Total Time: ~17-37 minutes
(Most of the time is just waiting for the build)

---

## 🆘 Quick Fixes

**Problem**: Can't find Actions tab
→ Make sure you uploaded the .github folder

**Problem**: Build failed
→ Check you added EXPO_TOKEN secret correctly

**Problem**: Can't download APK
→ Login to expo.dev and check Builds tab

---

## 📞 Stuck?

1. Re-read GITHUB_SETUP.md for detailed instructions
2. Check the Actions tab for error messages
3. Make sure all checkboxes above are completed

---

## 🎯 You Got This!

Follow each checkbox in order. Don't skip steps!

Your app will be ready soon! 🚀
