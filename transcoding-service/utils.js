import fs from 'fs';

export const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    } else {
      console.log(`Deleted file: ${filePath}`);
    }
  });
};

export const deleteDir = (dirPath) => {
  return new Promise((resolve, reject) => {
    fs.rm(dirPath, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error(`Error deleting directory: ${dirPath}`, err);
        reject(err);
      } else {
        console.log(`Successfully deleted directory: ${dirPath}`);
        resolve();
      }
    });
  });
};