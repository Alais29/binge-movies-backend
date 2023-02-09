import express from 'express'
import showsRouter from './showsRoutes'

const router = express.Router()

router.use('/shows', showsRouter)
// TODO add routes for users and auth

export default router
