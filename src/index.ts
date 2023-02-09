import { config } from './config'
import { db } from './services/db'
import Server from './services/server'

const { PORT } = config

Server.listen(PORT, () => {
  console.log(`Servidor inicializado en http://localhost:${PORT}`)
  db.connect()
})
Server.on('error', error => console.error(`Error en el servidor: ${error}`))
