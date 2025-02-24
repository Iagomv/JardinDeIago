import {createServer} from 'http'
import express from 'express'
import {Server} from 'socket.io'
import cors from 'cors'
import {handleClientConnections} from './conexionCliente.js'
import {connectToServerA} from './conexionServerA.js'
import userRoutes from './Routes/userRoutes.js'
import plantasRoutes from './Routes/plantasRoutes.js'
import articulosRoutes from './Routes/articulosRoutes.js'

const app = express()
const server = createServer(app) // Usamos createServer para mejorar compatibilidad con WebSockets

const puertoServerB = process.env.PUERTO
export const ioServerB = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})
app.use(
  cors({
    origin: '*', // Permite el origen específico
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true // Si necesitas enviar cookies o cabeceras de autenticación
  })
)
app.use(express.json())
// Conexión con Servidor A
connectToServerA(ioServerB)
app.use('/api/users', userRoutes)
app.use('/api/plantas', plantasRoutes)
app.use('/api/articulos', articulosRoutes)

// Manejo de clientes
handleClientConnections(ioServerB)

// Iniciar servidor
server.listen(puertoServerB, () => {
  console.log(`✅ Servidor B corriendo en puerto ${puertoServerB}`)
})
