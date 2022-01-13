import { v2 as cloudinary } from 'cloudinary'

export default async function uploadImage(imgPath: string, filename: string) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CNAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  })

  const res = await cloudinary.uploader.upload(imgPath, {
    public_id: `ulises.codes/blog/${filename}/header-image`,
  })

  return res.public_id
}
