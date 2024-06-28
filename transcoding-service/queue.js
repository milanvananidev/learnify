import dotenv from 'dotenv';
import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { deleteFile, deleteDir } from './utils.js'; 

dotenv.config();

const redisOptions = {
  maxRetriesPerRequest: null,
  tls: {
    rejectUnauthorized: false,
  },
};

const redisConnection = new IORedis(process.env.REDIS_URL, redisOptions);

const videoQueue = new Queue('video-transcoding', {
  connection: redisConnection,
});

const worker = new Worker('video-transcoding', async (job) => {
  const { inputFilePath, outputDir } = job.data;
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
        '-start_number 0',
      ])
      .output(hlsPath) // not a good way, need to store in s3 ( just for learning )
      .on('end', async () => {
        try {
          deleteFile(inputFilePath);
          
          const uploadsDir = path.dirname(inputFilePath);
          const courseDirInUploads = path.dirname(uploadsDir); 

          await deleteDir(uploadsDir);
          await deleteDir(courseDirInUploads);

          resolve({
            message: 'File processed and upload directories deleted successfully',
          });
        } catch (error) {
          reject(new Error('Error during cleanup: ' + error.message));
        }
      })
      .on('error', (err) => {
        // add dead letter quque here.
        reject(new Error('Error processing video'));
      })
      .run();
  });
}, { connection: redisConnection });

export { videoQueue };
