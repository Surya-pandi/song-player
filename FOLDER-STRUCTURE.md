# Music Player - Folder Structure

```
music-player-project/
│
├── uploads/                    # Folder for uploaded MP3 files
│   └── .gitkeep               # Keeps folder in git (empty by default)
│
├── index.html                 # Main music player interface (frontend)
├── server.js                  # Express server (backend)
├── package.json               # Node.js dependencies and scripts
├── .gitignore                 # Files/folders to ignore in git
└── README.md                  # Setup and deployment instructions
```

## 📁 Folder & File Details

### Root Files

**index.html**
- Main user interface
- Contains all the HTML, CSS, and JavaScript for the player
- Handles play/pause, shuffle, loop, progress bar
- Communicates with server for upload/delete

**server.js**
- Express.js backend server
- Handles API endpoints:
  - `GET /api/songs` - List all songs
  - `POST /api/upload` - Upload new songs
  - `DELETE /api/songs/:filename` - Delete songs
- Serves static files and the index.html
- Manages file storage in uploads folder

**package.json**
- Lists dependencies (express, multer)
- Contains start script: `npm start`
- Project metadata

**.gitignore**
- Ignores node_modules from git
- Ignores MP3 files in uploads folder
- Keeps repository clean

**README.md**
- Complete setup instructions
- Local development guide (VS Code)
- Render deployment guide
- Troubleshooting tips

### Folders

**uploads/**
- Stores all uploaded MP3 files
- Created automatically if missing
- Contains .gitkeep to preserve folder in git
- MP3 files are gitignored but folder structure is tracked

## 🚀 How to Use This Structure

### Local Development:
```bash
# 1. Navigate to project folder
cd music-player-project

# 2. Install dependencies (creates node_modules/)
npm install

# 3. Start server
npm start

# 4. Open browser
http://localhost:3000
```

### After npm install, structure becomes:
```
music-player-project/
├── node_modules/          # Created by npm install (ignored by git)
├── uploads/               
│   └── .gitkeep
├── index.html
├── server.js
├── package.json
├── package-lock.json      # Created by npm install
├── .gitignore
└── README.md
```

### After uploading songs:
```
music-player-project/
├── uploads/
│   ├── .gitkeep
│   ├── 1735290123456-song1.mp3    # Your uploaded songs
│   └── 1735290123789-song2.mp3
├── index.html
├── server.js
└── ...
```

## 📤 For GitHub:

Only these files/folders are tracked:
- ✅ index.html
- ✅ server.js
- ✅ package.json
- ✅ .gitignore
- ✅ README.md
- ✅ uploads/.gitkeep

Not tracked (ignored):
- ❌ node_modules/
- ❌ uploads/*.mp3
- ❌ .DS_Store
- ❌ *.log

## 🌐 For Render Deployment:

Render will:
1. Clone your GitHub repo
2. Run `npm install` (creates node_modules)
3. Run `npm start` (starts server.js)
4. Create uploads folder automatically
5. Your app is live!

Note: On Render's free tier, uploaded MP3 files in uploads/ folder are temporary and deleted on restart.
