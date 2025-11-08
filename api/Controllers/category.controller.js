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