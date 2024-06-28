import express from 'express';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { videoQueue } from './queue.js';
import { createDir } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('video'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const uploadId = uuidv4();
  const inputFilePath = req.file.path;
  const outputDir = path.join(__dirname, 'output', uploadId);

  createDir(outputDir);

  // Add job to queue
  await videoQueue.add('transcode', {
    inputFilePath,
    outputDir,
    uploadId
  });

  const videoURL = `${req.protocol}://${req.get('host')}/output/${uploadId}/index.m3u8`;

  res.json({
    message: 'File uploaded and added to queue for processing',
    videoURL: videoURL
  });
});

app.use('/output', express.static(path.join(__dirname, 'output')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
