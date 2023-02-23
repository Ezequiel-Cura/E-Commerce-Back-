import dotenv from "dotenv"
dotenv.config()
const {CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,CLOUDINARY_UPLOAD_PRESET} = process.env

import cloudinary from "cloudinary"
cloudinary.v2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    
})

export async function uploadImage(filepath:string) {
    return await cloudinary.v2.uploader.upload(filepath,{
        folder:"e-commerce",
        background_removal: "cloudinary_ai"
    })
}

export async function deleteImage(publicId:string) {
    return await cloudinary.v2.uploader.destroy(publicId)
}