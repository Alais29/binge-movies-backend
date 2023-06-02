import express from 'express'
import asyncHandler from 'express-async-handler'
import { UserController } from '@/controllers/userController'
import passport from '@/middlewares/auth'

const userRouter = express.Router()

userRouter.post(
  '/favorite-shows',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(UserController.addFavoriteShows),
)
userRouter.get(
  '/favorite-shows',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(UserController.getFavoriteShows),
)
// userRouter.delete(
//   '/:userId/favorite-shows/:showId',
//   passport.authenticate('jwt', { session: false }),
//   asyncHandler(UserController.deleteFavoriteShows),
// )

export default userRouter
