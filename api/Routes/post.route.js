import express from "express"
import { create, getAll, getOne, remove, update } from "../Controllers/post.controller.js"
import { isAdmin } from "../Middlewares/isAdmin.js"
import { isLogin } from "../Middlewares/isLogin.js"
const postRouter = express.Router()
postRouter.route('/').get(getAll).post( create)
postRouter.route('/:id').get(isLogin, getOne).patch(isAdmin, update).delete(isAdmin, remove)
export default postRouter