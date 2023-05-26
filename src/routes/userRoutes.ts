import express from 'express'
import asyncHandler from 'express-async-handler'
import { UserController } from '@/controllers/userController'

const userRouter = express.Router()

userRouter.post(
  '/favorite-shows',
  asyncHandler(UserController.addFavoriteShows),
)
// userRouter.get('/:id', asyncHandler(UserController.getShow))

export default userRouter
