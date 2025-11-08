import Category from "../Models/category.model.js";
import ApiFeatures from "vanta-api";
import { catchAsync, HandleERROR } from "vanta-api";

export const create = catchAsync(async (req, res, next) => {
    const category = await Category.create(req.body)
    res.status(200).json({
        success: true,
        date: category,
        message: 'create successfully'
    })
})

export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Category, req.query, req.role)
        .filter()
        .sort()
        .populate()
        .paginate()
        .limitFields()
    const categories = features.execute()
    const count = await Category.countDocuments(features.queryFilter)
    return res.status(200).json({
        success: true,
        data: categories,
        count
    })
})