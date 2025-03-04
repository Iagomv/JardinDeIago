import {Server} from 'socket.io'
import {sendArduino} from './arduinoCommunication.js'
import {generarDatos} from './GeneradorDatos.js'
import {setConfiguracionInicial} from './arduinoCommunication.js'
import {setNuevaConfiguracion} from './arduinoCommunication.js'
import {lastArduinoData} from './arduinoCommunication.js'
let io
let datosGenerados = null
export const serverRoom = 'servidoresRoom' // Nombre de la sala

// Generar y actualizar datos --> //* Funcion setInterval
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
if (lastArduinoData === null) setInterval(updateData, 30000)

// Registrar servidor B (Personal)
const registrarServidorB = (socket) => {
  // Unir al servidor B a la sala
  socket.join(serverRoom)
  console.log(`Servidor B registrado en la sala: ${socket.id}`)
  socket.emit('onRegistro', onRegistro(socket)) // Enviar los datos al servidor B
}

// Método que envía los datos a los servidores Se llama desde //*arduinoCommunication --> getArduinoData
export const actualizarServidores = (data) => {
  // Emitir datos a todos los sockets que están en la sala 'servidoresRoom'
  let room = io.sockets.adapter.rooms.get(serverRoom)
  if (!room || room.size === 0) return
  if (io.sockets.adapter.rooms.get(serverRoom).size === 0) return
  console.log('Enviando datos a la sala de servidores', data)

  io.to(serverRoom).emit('actualizarServidores', data)
}

const onRegistro = (socket) => {
  if (lastArduinoData !== null) return lastArduinoData
  else return datosGenerados
}

// Manejo de la desconexión de un servidor
const desconexion = (socket) => {
  socket.leave(serverRoom) // Dejar la sala al desconectarse
  console.log(`Servidor personal desconectado y eliminado de la sala: ${socket.id}`)
}
