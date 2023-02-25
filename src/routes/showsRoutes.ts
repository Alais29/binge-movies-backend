import express from 'express'
import { ShowsController } from '@/controllers/showsController'

const showsRouter = express.Router()

showsRouter.get('/', ShowsController.getShows)
showsRouter.get('/:id', ShowsController.getShow)

export default showsRouter
