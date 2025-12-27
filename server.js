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
        if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3') {
            cb(null, true);
        } else {
            cb(new Error('Only MP3 files are allowed!'), false);
        }
    },
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    }
});

// Serve static files
app.use(express.static(__dirname));
app.use('/uploads', express.static(uploadsDir));
app.use(express.json());

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Get list of uploaded songs
app.get('/api/songs', (req, res) => {
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
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
        
        res.json(songs);
    });
});

// Upload new song
app.post('/api/upload', upload.single('song'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    
    res.json({
        id: Date.now(),
        name: req.file.originalname.replace('.mp3', ''),
        file: `/uploads/${req.file.filename}`,
        filename: req.file.filename,
        duration: '0:00'
    });
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
