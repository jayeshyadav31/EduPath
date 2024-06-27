import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error('Local file path is missing');
    }

    // Determine resource type based on file MIME type
    let resourceType = 'auto';
    // if (localFilePath.endsWith('.mp4') || localFilePath.endsWith('.mov')) {
    //   resourceType = 'video';
    // } else if (localFilePath.endsWith('.jpg') || localFilePath.endsWith('.jpeg') || localFilePath.endsWith('.png')) {
    //   resourceType = 'image';
    // }

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resourceType,
      timeout: 600000 // Optional: Increase timeout (in ms) for large file uploads
    });

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.error(`Error uploading to Cloudinary: ${error.message}`);
      fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
