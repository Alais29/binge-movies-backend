import express from 'express'
import authRouter from './authRoutes'
import showsRouter from './showsRoutes'
import userRouter from './userRoutes'

const router = express.Router()

router.use('/shows', showsRouter)
router.use('/auth', authRouter)
router.use('/users', userRouter)

export default router
