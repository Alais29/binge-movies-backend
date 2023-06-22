import express from 'express'
import asyncHandler from 'express-async-handler'
import { ShowsController } from '../controllers/ShowsController'

const showsRouter = express.Router()

// TODO: Add routes/controller/model for adding, editing and deleting a show
showsRouter.get('/', asyncHandler(ShowsController.getShows))
showsRouter.get('/:id', asyncHandler(ShowsController.getShow))

export default showsRouter
