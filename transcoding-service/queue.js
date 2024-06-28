import dotenv from 'dotenv';
import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import path from 'path';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import { deleteFile } from './utils.js'; 

dotenv.config();

const redisOptions = {
  maxRetriesPerRequest: null,
  tls: {
    rejectUnauthorized: false
  }
};

const redisConnection = new IORedis(process.env.REDIS_URL, redisOptions);

const videoQueue = new Queue('video-transcoding', {
  connection: redisConnection
});

const worker = new Worker('video-transcoding', async job => {
  const { inputFilePath, outputDir, uploadId } = job.data;
  const hlsPath = path.join(outputDir, 'index.m3u8');

  return new Promise((resolve, reject) => {
    ffmpeg(inputFilePath)
      .videoCodec('libx264')
      .audioCodec('aac')
      .format('hls')
      .outputOptions([
        '-hls_time 10',
        '-hls_playlist_type vod',
        `-hls_segment_filename ${outputDir}/segment%03d.ts`,
        '-start_number 0'
      ])
      .output(hlsPath)
      .on('end', () => {
        // Delete the original uploaded file after successful transcoding
        deleteFile(inputFilePath);

        resolve({
          message: 'File processed and original file deleted successfully',
          videoURL: `${process.env.BASE_URL}/output/${uploadId}/index.m3u8`
        });
      })
      .on('error', (err) => {
        console.error('Error processing video:', err);
        reject(new Error('Error processing video'));
      })
      .run();
  });
}, { connection: redisConnection });

export { videoQueue };
