// projects/pos_coffee_shop/services/fileService.js
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');
const FormData = require('form-data');
const https = require('https');
const { v2: cloudinary } = require('cloudinary');

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const config = cloudinary.config();

/**
 * Delete old file from local storage
 */
function deleteLocalFile(filePath) {
  try {
    if (filePath && fs.existsSync(`public${filePath}`)) {
      fs.unlinkSync(`public${filePath}`);
      console.log('🗑️ Deleted old local file:', filePath);
    }
  } catch (error) {
    console.error('❌ Error deleting local file:', error);
  }
}

/**
 * Delete old file from Cloudinary
 */
async function deleteCloudinaryFile(cloudinaryUrl) {
  try {
    if (!cloudinaryUrl) return;

    // Extract public_id from Cloudinary URL
    // Example: https://res.cloudinary.com/xxx/image/upload/v123/folder/filename.jpg
    const urlParts = cloudinaryUrl.split('/');
    const filename = urlParts[urlParts.length - 1];
    const folder = urlParts[urlParts.length - 2];
    const publicId = `${folder}/${filename.split('.')[0]}`;

    const result = await cloudinary.uploader.destroy(publicId);
    console.log('🗑️ Deleted old Cloudinary file:', publicId, result);
  } catch (error) {

    console.error('❌ Error deleting Cloudinary file:', error);
  }
}

/**
 * Generate Cloudinary signature for authentication
 */
function generateSignature(params, apiSecret) {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');

  return crypto
    .createHash('sha1')
    .update(sortedParams + apiSecret)
    .digest('hex');
}

/**
 * Upload to Cloudinary using direct HTTP request
 */

async function deleteFileAsync(filePath) {
  try {
    await fsPromises.unlink(filePath);
    console.log('🗑️ Temp file deleted:', filePath);
  } catch (error) {
    console.error('❌ Failed to delete temp file:', error.message);
  }
}
async function uploadToCloudinaryDirect(originalPath, folder = 'general') {
  return new Promise(async (resolve, reject) => {
    try {
      if (!originalPath) return resolve(null);

      const absolutePath = path.resolve(originalPath);

      // ✅ Convert to WebP using sharp
      const webpBuffer = await sharp(absolutePath).toFormat('webp').toBuffer();

      const timestamp = Math.round(new Date().getTime() / 1000);
      const uploadParams = {
        timestamp: timestamp,
        folder: folder.replace(/[^a-zA-Z0-9_-]/g, '_'),
        use_filename: 'true',
        unique_filename: 'false',
        overwrite: 'true',
      };

      const signature = generateSignature(uploadParams, config.api_secret);

      const form = new FormData();
      form.append('file', webpBuffer, {
        filename: path.basename(originalPath).replace(/\.[^/.]+$/, '') + '.webp', // e.g., abc.png -> abc.webp
        contentType: 'image/webp',
      });
      form.append('api_key', config.api_key);
      form.append('timestamp', timestamp.toString());
      form.append('signature', signature);
      form.append('folder', uploadParams.folder);
      form.append('use_filename', uploadParams.use_filename);
      form.append('unique_filename', uploadParams.unique_filename);
      form.append('overwrite', uploadParams.overwrite);

      const options = {
        hostname: 'api.cloudinary.com',
        port: 443,
        path: `/v1_1/${config.cloud_name}/image/upload`,
        method: 'POST',
        headers: form.getHeaders(),
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            if (res.statusCode === 200 && result.secure_url) {
              console.log('✅ Cloudinary upload successful:', result.secure_url);
              deleteFileAsync(originalPath);
              resolve(result.secure_url);
            } else {
              console.error('❌ Cloudinary upload failed:', result);
              reject(new Error(`Cloudinary upload failed: ${result.error?.message || 'Unknown error'}`));
            }
          } catch (parseError) {
            reject(parseError);
          }
        });
      });

      req.on('error', (error) => reject(error));
      form.pipe(req);

    } catch (error) {
      reject(error);
    }
  });
}


/**
 * Move file locally (with optional WebP conversion)
 */
async function moveFileLocally(sourcePath, targetFolder, toWebp = false) {
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  const ext = path.extname(sourcePath);
  const baseName = path.basename(sourcePath, ext);
  const targetPath = path.join(targetFolder, `${baseName}${toWebp ? '.webp' : ext}`);

  if (toWebp) {
    await sharp(sourcePath).toFormat('webp').toFile(targetPath);
    // fs.unlinkSync(sourcePath);
    deleteFileAsync(sourcePath);
  } else {
    fs.renameSync(sourcePath, targetPath);
  }

  return targetPath.replace('public/', '/');
}

/**
 * Main unified save method with old file cleanup
 */
async function save(file, options = {}) {
  const {
    folder = 'general',
    storage = 'local',
    toWebp = false,
    oldFileUrls = null  // Pass the old file URL to delete it
  } = options;

  if (!file) return undefined;

  try {
    // Delete old file first (if provided)
    if (oldFileUrls && oldFileUrls.length > 0) {
      if (storage === 'cloudinary') {
        await deleteCloudinaryFile(oldFileUrls);
      } else {
        deleteLocalFile(oldFileUrls);
      }
    }

    const fullFolder = `public/uploads/${folder}`;

    if (storage === 'cloudinary') {
      return await uploadToCloudinaryDirect(file.path, folder);
    }

    // Local storage
    const finalPath = await moveFileLocally(file.path, fullFolder, toWebp);
    const relativeUrl = finalPath.replace(/^public[\\/]/, '').replace(/\\/g, '/');
    return `/${relativeUrl}`;

  } catch (error) {
    console.error('❌ Error in save function:', error);
    throw error;
  }
}

/**
 * Handle multiple files with cleanup
 */
async function saveMultiple(files = [], options = {}) {
  const { oldFileUrls = [] } = options;

  // Delete old files first
  for (const oldUrl of oldFileUrls) {
    if (oldUrl) {
      if (options.storage === 'cloudinary') {
        await deleteCloudinaryFile(oldUrl);
      } else {
        deleteLocalFile(oldUrl);
      }
    }
  }

  return await Promise.all(files.map((file) => save(file, { ...options, oldFileUrls: null })));
}
async function deleteFile(url, storage) {
  if (!url || !storage) return;

  if (storage === 'cloudinary') {
    console.log('🗑️ Deleting Cloudinary file:', url);
    await deleteCloudinaryFile(url);
  } else {
    deleteLocalFile(url);
  }
}


module.exports = {
  fileService: {
    save,
    saveMultiple,
    deleteLocalFile,
    deleteCloudinaryFile,
    delete: deleteFile,
  },
};