import express from 'express'
import http from 'http'
import cors from 'cors'
import {handleSockets} from './socketHandler.js'

const puerto = 6179
const app = express()
const server = http.createServer(app)

// Middleware
app.use(cors())
app.use(express.json())

// Inicializa los sockets después de crear el servidor
handleSockets(server)

// Iniciar el servidor
server.listen(puerto, () => console.log(`Server running on port ${puerto}`))

export {server}
