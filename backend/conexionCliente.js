//*EN ESTE ARCHIVO MANEJAMOS LA CONEXIÓN CON LOS CLIENTES
// * y enviamos datos a arduino a traves del servidor A con sendDataToArduino //

const clientesRoom = 'clientesRoom' // Nombre de la sala
export let loggedUsers = []
import {
	sendDataToArduino,
	setConfiguracionInicial,
	setNuevaConfiguracion,
	newServoPosition,
	changeDataDelay,
} from './conexionServerA.js'
import { ioServerB } from './serverIndividualIMV.js'

export const handleClientConnections = (ioServerB) => {
	ioServerB.on('connection', (socket) => {
		nuevoCliente(socket)
		socket.on('configuracionInicial', (data) => setConfiguracionInicial(data))
		socket.on('sendDataToArduino', (data) => sendDataToArduino(data))
		socket.on('nuevaConfiguracion', (data) => setNuevaConfiguracion(data))
		socket.on('regarJardin', () => wateringPlants())
		socket.on('disconnect', (socket) => desconectarCliente(socket))
		socket.on('loggedUserInfo', (data) => onLoggedUserInfo(socket, data))
	})
}

const nuevoCliente = (socket) => {
	socket.join(clientesRoom) // Unir al cliente a la sala
	console.log(`🟢 Nuevo cliente conectado: ${socket.id}`)
}

const desconectarCliente = (socket) => {
	console.log(`🔴 Cliente desconectado: ${socket.id}`)
	loggedUsers = loggedUsers.filter((user) => user.socketId !== socket.id)
}

const wateringPlants = () => {
	console.log('Server recieved the order to water plants')
	newServoPosition(0)
	setTimeout(() => newServoPosition(180), 1000)
	setTimeout(() => newServoPosition(0), 2000)
	newServoPosition(0)
}
// Utilizamos la funcion en conexionServerA cuando llegan nuevos datos desde Arduino
export const enviarDatosACliente = (data) => {
	ioServerB.to(clientesRoom).emit('datosActualizados', data) // Enviar a clientes conectados
}

const onLoggedUserInfo = (socket, userData) => {
	console.log('loggedUserInfo', userData)
	loggedUsers.push({ loggedUser: { socketId: socket.id, ...userData } })
	console.log('users logged', loggedUsers)
}

export const notifyUser = (data, user) => {
	ioServerB.to(user.socketId).emit('alert', data)
}
