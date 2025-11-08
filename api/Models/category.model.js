import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    image: {
        type: [String],
        default: []
    }
},{timestamps:true})

const Category = mongoose.model('Category', categorySchema)
export default Category