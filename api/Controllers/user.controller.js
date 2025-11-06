import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import User from "../Models/user.model.js";

export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(User, req.query, req.role)
        .filter()
        .populate()
        .paginate()
        .limitFields()
        .sort()
    const users = await features.execute()
    const count = await User.countDocuments(req.query)
    return res.status(200).json({
        success: true,
        data: users,
        count,
        message: 'users successfully'
    })
})