import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    name:{type:String, required:true},
    prompt:{type:String, required:true},
    photo:{type:String, required:true},
    creator:String,
    createdAt:{
        type:Date,
        default:new Date()
    },
    likeCount:{
        type:Number,
        default:0
    }
})

const PostModel = mongoose.model('Post',PostSchema)

export default PostModel;