import express from 'express'
import { Server } from 'http'
import { db } from './services/db'

const app: express.Application = express()
const PORT = process.env.PORT || 8080

const server: Server = app.listen(PORT, () => {
  console.log('Server started on port', PORT)
})
server.on('error', error => console.log('Error on server:', error))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

db.connect()
