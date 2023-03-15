import express from 'express'
import authRouter from './authRoutes'
import showsRouter from './showsRoutes'

const router = express.Router()

router.use('/shows', showsRouter)
router.use('/auth', authRouter)

export default router
