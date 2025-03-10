import {createServer} from 'http'
import express from 'express'
import {Server} from 'socket.io'
import cors from 'cors'
import {handleClientConnections} from './conexionCliente.js'
import {connectToServerA} from './conexionServerA.js'
import userRoutes from './Routes/userRoutes.js'
import plantasRoutes from './Routes/plantasRoutes.js'
import articulosRoutes from './Routes/articulosRoutes.js'
import registrosRoutes from './Routes/registrosRoutes.js'
import configuracionRangosRoutes from './Routes/configuracionRangos.js'
import empleadosRoutes from './Routes/empleadosRoutes.js'
import jardinesRoutes from './Routes/jardinesRoutes.js'

const app = express()
const server = createServer(app)

const puertoServerB = process.env.PUERTO
export const ioServerB = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)
app.use(express.json())
// Conexión con Servidor A
connectToServerA(ioServerB)
app.use('/api/users', userRoutes)
app.use('/api/plantas', plantasRoutes)
app.use('/api/articulos', articulosRoutes)
app.use('/api/registros', registrosRoutes)
app.use('/api/config', configuracionRangosRoutes)
app.use('/api/empleados', empleadosRoutes)
app.use('/api/jardines', jardinesRoutes)

// Manejo de clientes
handleClientConnections(ioServerB)

// Iniciar servidor
server.listen(puertoServerB, () => {
  console.log(`✅ Servidor B corriendo en puerto ${puertoServerB}`)
})
