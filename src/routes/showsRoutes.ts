import express from 'express'
import { ShowsController } from '@/controllers/showsController'

const showsRouter = express.Router()

showsRouter.get('/', ShowsController.getShows)

export default showsRouter
