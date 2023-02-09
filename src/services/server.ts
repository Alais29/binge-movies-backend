import express from 'express'
import * as http from 'http'
import router from '@/routes'

const app: express.Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

const Server: http.Server = http.createServer(app)

export default Server
