import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Post from "../Models/post.model.js";
import { update } from "./user.controller.js";

export const create = catchAsync(async (re, res, next) => {
    const post = await Post.create(req.body)
    return res.status(200).json({
        success: true,
        data: post,
        message: 'create post successfully'
    })
})
export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Post, req.query, req.role)
        .filter()
        .sort()
        .paginate()
        .limitFields()
        .populate()
    const posts = await features.execute()
    const count = await Post.countDocuments(features.queryFilter)
    return res.status(200).json({
        success: true,
        data: posts,
        count
    })
})
export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) {
        return next(new HandleERROR('post not found'), 404)
    }
    return res.status(200).json({
        success: true,
        data: post
    })
})
export const update = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const post = await Post.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })
    if (!post) {
        return next(new HandleERROR('post not found'), 404)
    }
    return res.status(200).json({
        success: true,
        data: post
    })
})
