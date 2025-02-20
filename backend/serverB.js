import {createServer} from 'http'
import express from 'express'
import {Server} from 'socket.io'
import {handleClientConnections} from './handleClients.js'
import {connectToServerA} from './conexionServerA.js'

const app = express()
const server = createServer(app) // Usamos createServer para mejorar compatibilidad con WebSockets

const puertoServerB = 5000
const ioServerB = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

// Manejo de clientes
handleClientConnections(ioServerB)

// Conexión con Servidor A
connectToServerA(ioServerB)

// Iniciar servidor
server.listen(puertoServerB, () => {
  console.log(`✅ Servidor B corriendo en puerto ${puertoServerB}`)
})
