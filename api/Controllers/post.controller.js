import ApiFeatures, { catchAsync } from "vanta-api";
import Post from "../Models/post.model.js";

export const create = catchAsync(async (re, res, next) => {
    const post = await Post.create(req.body)
    return res.status(200).json({
        success: true,
        data: post,
        message: 'create post successfully'
    })
})
export const getAll = catchAsync(async(req,res,next)=>{
    const features = new ApiFeatures(Post,req.query,req.role)
    .filter()
    .sort()
    .paginate()
    .limitFields()
    .populate()
    const posts = await features.execute()
    const count = await Post.countDocuments(features.queryFilter)
    return res.status(200).json({
        success:true,
        data:posts,
        count
    })
})