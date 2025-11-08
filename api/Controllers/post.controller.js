import { catchAsync } from "vanta-api";
import Post from "../Models/post.model.js";

export const create = catchAsync(async (re, res, next) => {
    const post = await Post.create(req.body)
    return res.status(200).json({
        success: true,
        data: post,
        message: 'create post successfully'
    })
})