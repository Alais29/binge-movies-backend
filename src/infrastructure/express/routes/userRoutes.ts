import express from 'express'
import asyncHandler from 'express-async-handler'
import { UserController } from '../controllers/UserController'
import passport from '../middlewares/auth'

const userRouter = express.Router()

userRouter.put(
  '/favorite-shows',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(UserController.addFavoriteShows),
)
userRouter.get(
  '/favorite-shows',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(UserController.getFavoriteShows),
)
userRouter.delete(
  '/favorite-shows/:showId',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(UserController.deleteFavoriteShow),
)

export default userRouter
