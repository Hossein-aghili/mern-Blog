import mongoose, { Schema } from "mongoose";
const postSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
    image :{
        type:[String],
        default:[]
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
},{timestamps:true})
 const Post =mongoose.model('Post',postSchema)
 export default Post