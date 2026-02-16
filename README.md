# My Notepad App - Installation Guide

## 📱 Features
- ✅ 5 color-coded categories (Study, Business, Creativity, Reminders, Random)
- ✅ Create, edit, and delete notes
- ✅ Auto-save functionality
- ✅ Date and time tracking for each note
- ✅ Press and hold to delete/edit notes
- ✅ Change category from long-press menu
- ✅ Haptic feedback
- ✅ Beautiful, native Android interface

## 🚀 How to Build and Install the Android App

### Option 1: Using Expo EAS Build (RECOMMENDED - Easiest)

This method builds the APK online without installing Android Studio.

#### Step 1: Install Node.js
1. Download Node.js from: https://nodejs.org/
2. Install the LTS version (recommended)
3. Verify installation by opening terminal/command prompt and typing:
   ```
   node --version
   npm --version
   ```

#### Step 2: Install Expo CLI
Open terminal/command prompt and run:
```bash
npm install -g expo-cli eas-cli
```

#### Step 3: Create Expo Account
1. Go to https://expo.dev/signup
2. Create a free account
3. Verify your email

#### Step 4: Navigate to Project Folder
```bash
cd path/to/NotepadApp
```

#### Step 5: Install Dependencies
```bash
npm install
```

#### Step 6: Login to Expo
```bash
eas login
```
Enter your Expo account credentials.

#### Step 7: Configure EAS Build
```bash
eas build:configure
```
- Select "All" when asked about platforms
- This creates an eas.json file

#### Step 8: Build the APK
```bash
eas build -p android --profile preview
```

This will:
- Upload your code to Expo servers
- Build the APK in the cloud
- Give you a download link when complete (usually 10-20 minutes)

#### Step 9: Download and Install
1. Click the link provided after build completes
2. Download the APK to your Android phone
3. Open the APK file
4. Allow installation from unknown sources if prompted
5. Install and enjoy!

---

### Option 2: Using Android Studio (Advanced)

If you prefer to build locally without cloud services:

#### Step 1: Install Android Studio
1. Download from: https://developer.android.com/studio
2. Install with default settings
3. Open Android Studio and go through the setup wizard

#### Step 2: Install Node.js
1. Download from: https://nodejs.org/
2. Install the LTS version

#### Step 3: Install Expo CLI
```bash
npm install -g expo-cli
```

#### Step 4: Navigate to Project and Install Dependencies
```bash
cd path/to/NotepadApp
npm install
```

#### Step 5: Start Expo
```bash
npm start
```

#### Step 6: Run on Android
Press `a` in the terminal to run on Android emulator, or scan the QR code with the Expo Go app on your phone.

#### Step 7: Build APK Locally
```bash
npx expo prebuild
cd android
./gradlew assembleRelease
```

The APK will be at:
`android/app/build/outputs/apk/release/app-release.apk`

---

## 📖 How to Use the App

### Creating a Note
1. Tap the **+** button at the bottom right
2. Select a category (Study, Business, Creativity, Reminders, or Random)
3. Add a title (optional)
4. Write your note content
5. Tap **Save**

### Editing a Note
**Method 1:** Tap on any note to edit it

**Method 2:** Long press on a note → Select "Edit Note"

### Deleting a Note
1. Long press on the note
2. Select "Delete Note"
3. Confirm deletion

### Changing Category
1. Long press on the note
2. Select "Change Category"
3. Choose the new category

### Filtering Notes
- Tap any category button at the top to filter
- Tap "All" to see all notes

---

## 🎨 Categories

| Category | Color | Icon | Use For |
|----------|-------|------|---------|
| Study | Green | 📚 | Educational notes, learning materials |
| Business | Blue | 💼 | Work-related notes, meetings |
| Creativity | Orange | 🎨 | Ideas, creative projects |
| Reminders | Red | ⏰ | Tasks, things to remember |
| Random | Purple | 🎲 | Everything else |

---

## 🔧 Troubleshooting

### "Installation blocked"
- Go to Settings → Security → Enable "Install from unknown sources"

### Build fails with EAS
- Make sure you're logged in: `eas login`
- Check your internet connection
- Verify your Expo account is confirmed

### Can't install dependencies
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

### App crashes on startup
- Make sure all dependencies are installed
- Clear app data and restart

---

## 📝 Notes
- All notes are saved automatically
- Data is stored locally on your device
- Notes persist even after closing the app
- No internet connection required to use the app

---

## 💡 Tips
- Use long press for quick access to actions
- Filter by category for better organization
- The app shows relative dates (Today, Yesterday, etc.)
- Haptic feedback confirms your actions

---

## 📞 Need Help?
If you encounter any issues:
1. Make sure Node.js is installed correctly
2. Verify all dependencies installed: `npm install`
3. Check that you're using the latest Expo CLI: `npm install -g expo-cli@latest`

---

## 🎉 Enjoy Your New Notepad App!
