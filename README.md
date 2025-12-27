# 🎵 Music Player

A beautiful, feature-rich music player with upload and delete functionality.

## Features

- ▶️ Play/Pause, Next, Previous controls
- 🔀 Shuffle mode
- 🔁 Loop current song
- 📊 Progress bar with seek functionality
- ⏱️ Current time and duration display
- ➕ Upload new MP3 files (drag & drop or click)
- 🗑️ Delete songs from playlist
- 🎨 Beautiful gradient design
- 💾 Persistent storage on server

## Local Setup (VS Code)

### Prerequisites
- Node.js installed (v14 or higher)
- VS Code

### Installation Steps

1. **Open the project in VS Code**
   ```bash
   cd path/to/music-player
   code .
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your initial songs** (optional)
   - Create an `uploads` folder in the project root
   - Copy your MP3 files into the `uploads` folder

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open in browser**
   - Navigate to `http://localhost:3000`
   - Your music player is now running!

## Deploy to Render

### Step 1: Prepare Your Repository

1. **Initialize Git repository** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**
   - Create a new repository on GitHub
   - Follow GitHub's instructions to push your code

### Step 2: Deploy on Render

1. **Go to [Render](https://render.com)** and sign up/login

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select your music player repository

3. **Configure the service**
   - **Name:** `music-player` (or your choice)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or your preference)

4. **Add Environment Variables** (optional)
   - `PORT` is automatically set by Render

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete (2-5 minutes)
   - Your app will be live at: `https://your-service-name.onrender.com`

### Step 3: Important Notes for Render

⚠️ **Free Tier Limitations:**
- Free tier services sleep after 15 minutes of inactivity
- First request after sleep may take 30-50 seconds
- Uploaded files are **ephemeral** (deleted on restart)

💡 **For Persistent File Storage:**
- Upgrade to a paid plan
- Use Render Disks (add a persistent disk volume)
- Or use external storage (AWS S3, Cloudinary, etc.)

### Alternative: Use Render Disk for Persistent Storage

1. In your Render dashboard, go to your service
2. Click "Disks" → "Add Disk"
3. Configure:
   - **Name:** `music-uploads`
   - **Mount Path:** `/app/uploads`
   - **Size:** 1GB (or as needed)
4. Redeploy your service

## Usage

1. **Play Music:** Click on any song in the playlist
2. **Upload Songs:** Drag & drop MP3 files or click "Choose Files"
3. **Delete Songs:** Click the "Delete" button on any song
4. **Shuffle:** Click the 🔀 button to randomize playlist
5. **Loop:** Click the 🔁 button to repeat current song
6. **Seek:** Click anywhere on the progress bar to jump to that position

## Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express
- **File Upload:** Multer
- **Audio:** HTML5 Audio API

## File Structure

```
music-player/
├── index.html          # Main player interface
├── server.js           # Express server
├── package.json        # Dependencies
├── .gitignore         # Git ignore rules
├── uploads/           # Uploaded MP3 files (created automatically)
└── README.md          # This file
```

## Troubleshooting

**Songs not loading?**
- Make sure the server is running (`npm start`)
- Check the browser console for errors
- Verify MP3 files are in the `uploads` folder

**Upload not working?**
- Ensure you're uploading MP3 files only
- Check file size (max 50MB per file)
- Verify the `uploads` directory has write permissions

**Deployed app loses songs?**
- Free tier on Render has ephemeral storage
- Songs are deleted when the service restarts
- Use Render Disk or upgrade for persistent storage

## License

MIT License - feel free to use and modify!
