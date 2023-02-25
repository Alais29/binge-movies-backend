import express from 'express'
import asyncHandler from 'express-async-handler'
import { ShowsController } from '@/controllers/showsController'

const showsRouter = express.Router()

showsRouter.get('/', asyncHandler(ShowsController.getShows))
showsRouter.get('/:id', asyncHandler(ShowsController.getShow))

export default showsRouter
