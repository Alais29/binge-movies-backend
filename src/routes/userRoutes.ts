import express from 'express'
import asyncHandler from 'express-async-handler'
import { UserController } from '@/controllers/userController'

const userRouter = express.Router()

userRouter.post(
  '/favorite-shows',
  asyncHandler(UserController.addFavoriteShows),
)
userRouter.get(
  '/:userId/favorite-shows',
  asyncHandler(UserController.getFavoriteShows),
)

export default userRouter
