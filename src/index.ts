import express from 'express'
import { Server } from 'http'

const app: express.Application = express()
const PORT = process.env.PORT || 8080

const server: Server = app.listen(PORT, () => {
  console.log('Servidor inicializado en el puerto', PORT)
})
server.on('error', error => console.log('Error en el servidor:', error))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
