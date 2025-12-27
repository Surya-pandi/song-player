const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log('Checking uploaded file:', file.originalname, 'MIME type:', file.mimetype);
        
        // Accept MP3 files by MIME type or extension
        const isMP3 = file.mimetype === 'audio/mpeg' || 
                      file.mimetype === 'audio/mp3' ||
                      file.originalname.toLowerCase().endsWith('.mp3');
        
        if (isMP3) {
            cb(null, true);
        } else {
            cb(new Error(`Only MP3 files are allowed! Received: ${file.mimetype}`), false);
        }
    },
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    }
});

// Serve static files
app.use(express.static(__dirname));
app.use('/uploads', express.static(uploadsDir, {
    setHeaders: (res, filepath) => {
        if (filepath.endsWith('.mp3')) {
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Accept-Ranges', 'bytes');
        }
    }
}));
app.use(express.json());

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Get list of uploaded songs
app.get('/api/songs', (req, res) => {
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Error reading uploads directory:', err);
            return res.status(500).json({ error: 'Unable to read files' });
        }
        
        const songs = files
            .filter(file => file.endsWith('.mp3'))
            .map((file, index) => ({
                id: index + 1,
                name: file.replace(/^\d+-\d+-/, '').replace('.mp3', ''),
                file: `/uploads/${file}`,
                filename: file,
                duration: '0:00'
            }));
        
        console.log(`Found ${songs.length} songs in uploads directory`);
        res.json(songs);
    });
});

// Upload new song
app.post('/api/upload', upload.single('song'), (req, res) => {
    if (!req.file) {
        console.error('No file uploaded in request');
        return res.status(400).json({ error: 'No file uploaded' });
    }
    
    console.log('File uploaded successfully:', req.file.filename);
    
    res.json({
        id: Date.now(),
        name: req.file.originalname.replace('.mp3', ''),
        file: `/uploads/${req.file.filename}`,
        filename: req.file.filename,
        duration: '0:00'
    });
});

// Error handling middleware for multer
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        console.error('Multer error:', error);
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large. Maximum size is 50MB.' });
        }
        return res.status(400).json({ error: error.message });
    } else if (error) {
        console.error('Upload error:', error);
        return res.status(400).json({ error: error.message });
    }
    next();
});

// Delete song
app.delete('/api/songs/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);
    
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to delete file' });
        }
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`🎵 Music Player server running on http://localhost:${PORT}`);
});