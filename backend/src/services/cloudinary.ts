import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_SECRET_KEY as string,
});

const uploadOnCloudinary = async (
  localFilePath: string,
  folder: string
): Promise<UploadApiResponse | null> => {
  try {
    if (!localFilePath) {
      return null;
    }

    const response: UploadApiResponse = await cloudinary.uploader.upload(localFilePath, {
      folder,
      resource_type: "image",
    });

    fs.unlinkSync(localFilePath); 
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); 
    }

    return null;
  }
};

export { uploadOnCloudinary, cloudinary };