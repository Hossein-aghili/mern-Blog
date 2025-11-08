import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import morgan from 'morgan'
import authRouter from './Routes/auth.route.js'
import { HandleERROR } from 'vanta-api'
import userRouter from './Routes/user.route.js'
import categoryRouter from './Routes/category.route.js'
import postRouter from './Routes/post.route.js'

const __filename =fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/post', postRouter)

app.use((req, res, next) => {
    next(new HandleERROR('Route not Found', 404))
})

export default app 
