import {Server} from 'socket.io'
import {sendArduino} from './arduinoCommunication.js'
import {generarDatos} from './GeneradorDatos.js'
import {setConfiguracionInicial} from './arduinoCommunication.js'
import {setNuevaConfiguracion} from './arduinoCommunication.js'
let io
let datosGenerados = null
const serverRoom = 'servidoresRoom' // Nombre de la sala

// Generar y actualizar datos cada 5 segundos
const updateData = () => {
  let room = io.sockets.adapter.rooms.get(serverRoom)
  if (!room || room.size === 0) return
  if (io.sockets.adapter.rooms.get(serverRoom).size === 0) return
  datosGenerados = generarDatos()
  actualizarServidores(datosGenerados)
}

// Función principal que maneja las conexiones de sockets
export const handleSockets = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', (socket) => {
    console.log(`Servidor B conectado: ${socket.id}`)
    // Registrar el servidor B al unirse a la sala
    socket.on('registrarServidorB', () => registrarServidorB(socket))
    socket.on('sendDataToArduino', (data) => sendArduino(data))
    socket.on('configuracionInicial', () => setConfiguracionInicial())
    socket.on('nuevaConfiguracion', (data) => setNuevaConfiguracion(data))

    // Recepción de datos desde Arduino
    socket.on('sendArduino', (data) => sendArduino(data))
    // Manejo de la desconexión
    socket.on('disconnect', () => desconexion(socket))
  })
}
setInterval(updateData, 30000)

// Registrar servidor B (Personal)
const registrarServidorB = (socket) => {
  // Unir al servidor B a la sala
  socket.join(serverRoom)
  console.log(`Servidor B registrado en la sala: ${socket.id}`)
  socket.emit('onRegistro', datosGenerados) // Enviar los datos al servidor B
}

// Enviar datos actualizados a todos los servidores B en la sala
export const actualizarServidores = (data) => {
  console.log('Enviando datos a la sala de servidores', data)
  // Emitir datos a todos los sockets que están en la sala 'servidoresRoom'
  io.to(serverRoom).emit('actualizarServidores', data)
}

// Manejo de la desconexión de un servidor
const desconexion = (socket) => {
  socket.leave(serverRoom) // Dejar la sala al desconectarse
  console.log(`Servidor personal desconectado y eliminado de la sala: ${socket.id}`)
}
