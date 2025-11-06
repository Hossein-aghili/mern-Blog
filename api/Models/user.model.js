import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username or password is required']
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'username or password is required'],
    },
    role: {
        enum: ['user', 'admin'],
        default:'user'
    }
},{timestamps:true})
const User = mongoose.model('User',userSchema)
export default User