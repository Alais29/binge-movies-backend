import express from 'express'
import * as http from 'http'
import cors from 'cors'
import router from '@/infrastructure/express/routes'
import { errorHandler } from '@/infrastructure/express/middlewares/errorHandler'
import { unknownEndpoint } from '@/infrastructure/express/middlewares/unknownEndpoint'
import { config } from '../config'
import { mongoDb } from '@/infrastructure/database/mongo/MongoDatabase'

const { PORT } = config

export class Application {
  private app: express.Application

  constructor() {
    this.app = express()
    this.configureExpressMiddlewares()
    this.configureRoutes()
    this.configureErrorHandling()
  }

  private configureExpressMiddlewares() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors())
  }

  private configureRoutes() {
    this.app.use('/api', router)
  }

  private configureErrorHandling() {
    this.app.use(errorHandler)
    this.app.use(unknownEndpoint)
  }

  public getServer() {
    const server: http.Server = http.createServer(this.app)
    return server
  }

  public startServer() {
    const server = this.getServer()
    server.listen(PORT, () => {
      console.log(`Servidor inicializado en http://localhost:${PORT}`)
      mongoDb.connect()
    })
  }
}
