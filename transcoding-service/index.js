import express from 'express';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { videoQueue } from './queue.js';
import { createDir } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { courseID, contentID } = req.params;
    const uploadPath = path.join(__dirname, 'uploads', courseID, contentID);
    createDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// later use s3 to get video & transcode it
app.post('/upload/:courseID/:contentID', upload.single('video'), async (req, res) => {
  const { courseID, contentID } = req.params;

  if (!req.file || !courseID || !contentID) {
    return res.status(400).send('Provide all information');
  }

  const inputFilePath = req.file.path;
  const outputDir = path.join(__dirname, 'output', courseID, contentID);

  createDir(outputDir);

  await videoQueue.add('transcode', {
    inputFilePath,
    outputDir,
    contentID,
  });

  const videoURL = `${req.protocol}://${req.get('host')}/output/${courseID}/${contentID}/index.m3u8`;

  res.json({
    message: 'File uploaded and added to queue for processing',
    videoURL: videoURL,
  });
});

app.use('/output', express.static(path.join(__dirname, 'output')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
