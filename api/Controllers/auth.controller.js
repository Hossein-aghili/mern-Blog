import { catchAsync, HandleERROR } from "vanta-api";
import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
export const register = catchAsync(async (req, res, next) => {
    const { password = null, role = null, ...others } = req.body
    if (!password) {
        return next(new HandleERROR('username or password is required', 400))
    }
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return next(new HandleERROR("Password must be at least 8 characters long, include an uppercase letter, a number, and a special character."))
    }
    const hashPassword = await bcryptjs.hash(password, 10)
    const user = await User.create({...others ,password: hashPassword})

    return res.status(200).json({
        success: true,
        data: user,
        message: 'register successfully'
    })
})
export const login = catchAsync(async (req, res, next) => {
    const { password = null, username = null } = req.body
    if (!password || !username) {
        return next(new HandleERROR('username or password is required'), 400)
    }
    const user = await User.findOne({ username })
    if (!user) {
        return next(new HandleERROR('user not fund'))
    }
    const checkPassword = bcryptjs.compareSync(password, user.password)
    if (!checkPassword) {
        return next(new HandleERROR('Invalid Password'), 400)
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET)

    return res.status(200).json({
        success:true,
        data:{
            id:user._id,
            role:user.role,
            username:user.username,
            email:user.email,
            token
        },
        message:'login successfully'
    })
})