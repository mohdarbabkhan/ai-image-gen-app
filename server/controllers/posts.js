import * as dotenv from "dotenv"
import {v2 as cloudinary} from "cloudinary"
import PostModel from "../mongoDb/models/post.js"

dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
})

// GET A POST

export const getPosts = async(req,res) =>{
    try {
            const posts = await PostModel.find({});
            res.status(200).json({success:true, data: posts})
        } catch (error) {
            res.status(500).json({success: false, message:error})
        } 
    }

// CREATE A POST
export const createPost = async(req,res) =>{
    try {
        const {name,prompt,photo} = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
    
        const newPost = await PostModel.create({
            name,
            prompt,
            creator: req.userId,
            photo:photoUrl.url,
            createdAt: new Date().toISOString()
        })
    
        res.status(201).json({success:true, data: newPost});
        } catch (error) {
            res.status(500).json({success: false, message:error})
        }
}