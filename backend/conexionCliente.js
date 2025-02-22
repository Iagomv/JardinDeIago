//*EN ESTE ARCHIVO MANEJAMOS LA CONEXIÓN CON LOS CLIENTES
// * y enviamos datos a arduino a traves del servidor A con sendDataToArduino //

const clientesRoom = 'clientesRoom' // Nombre de la sala
import {sendDataToArduino} from './conexionServerA.js'
import {ioServerB} from './serverB.js'
import {setConfiguracionInicial} from './conexionServerA.js'
import {setNuevaConfiguracion} from './conexionServerA.js'

export const handleClientConnections = (ioServerB) => {
  ioServerB.on('connection', (socket) => {
    nuevoCliente(socket)
    socket.on('configuracionInicial', (data) => setConfiguracionInicial(data))
    socket.on('sendDataToArduino', (data) => sendDataToArduino(data))
    socket.on('nuevaConfiguracion', (data) => setNuevaConfiguracion(data))
    socket.on('disconnect', (socket) => desconectarCliente(socket))
  })
}

const nuevoCliente = (socket) => {
  socket.join(clientesRoom) // Unir al cliente a la sala
  console.log(`🟢 Nuevo cliente conectado: ${socket.id}`)
}

const desconectarCliente = (socket) => {
  console.log(`🔴 Cliente desconectado: ${socket.id}`)
}

// Utilizamos la funcion en conexionServerA cuando llegan nuevos datos desde Arduino
export const enviarDatosACliente = (data) => {
  ioServerB.to(clientesRoom).emit('datosActualizados', data) // Enviar a clientes conectados
}
