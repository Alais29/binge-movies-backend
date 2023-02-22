import express from 'express'
import * as http from 'http'
import cors from 'cors'
import router from '@/routes'
import { errorHandler } from '@/middlewares/errorHandler'
import { unknownEndpoint } from '@/middlewares/unknownEndpoint'

const app: express.Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use('/api', router)

app.use(errorHandler)
app.use(unknownEndpoint)

const Server: http.Server = http.createServer(app)

export default Server
