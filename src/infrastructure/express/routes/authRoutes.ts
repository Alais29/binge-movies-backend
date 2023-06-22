import express from 'express'
import asyncHandler from 'express-async-handler'
import { AuthController } from '../controllers/AuthController'

const authRouter = express.Router()

authRouter.post('/signup', asyncHandler(AuthController.signupUser))
authRouter.post('/login', asyncHandler(AuthController.loginUser))

export default authRouter
