import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { SOCKET_IP_SERVERB } from '../api/Endpoints'
import { useUserContext } from '../context/UserContext'
import { myAlert } from '../error/myAlert'

const useServer = () => {
	const [arduinoData, setArduinoData] = useState(null)
	const [clientSocket, setClientSocket] = useState(null)
	const { userInfo } = useUserContext()
	const [serverUserInfo, setServerUserInfo] = useState(null)
	useEffect(() => {
		const socket = io(SOCKET_IP_SERVERB, {
			reconnection: true,
			reconnectionAttempts: 5,
			reconnectionDelay: 2000,
		})

		socket.on('connect', () => {
			console.log('🟢 Conectado al servidor')
			socket.emit('registrarServidorB')
		})

		socket.on('datosActualizados', (data) => {
			const nonUndefinedData = Object.fromEntries(
				Object.entries(data).map(([key, value]) => [key, value === undefined ? 0 : value])
			)
			setArduinoData(nonUndefinedData)
			console.log('📩 Datos recibidos:', nonUndefinedData)
		})

		socket.on('disconnect', () => {
			console.log('🔴 Desconectado del servidor. Intentando reconectar...')
		})

		socket.on('alert', (data) => {
			myAlert('Error', JSON.stringify(data))
		})

		setClientSocket(socket)

		return () => {
			socket.disconnect()
		}
	}, [])

	useEffect(() => {
		if (clientSocket && serverUserInfo) {
			console.log('🔄 Enviando usuario actualizado:', serverUserInfo)
			clientSocket.emit('loggedUserInfo', serverUserInfo)
		}
	}, [serverUserInfo, clientSocket])

	const sendArduino = (data) => {
		if (clientSocket) {
			clientSocket.emit('enviarArduino', data)
		}
	}

	const setConfiguracionInicial = () => {
		if (clientSocket) {
			console.log('Configuración Inicial')
			clientSocket.emit('configuracionInicial')
		}
	}

	const setNuevaConfiguracion = (data) => {
		if (clientSocket) {
			console.log('Nueva configuración')
			clientSocket.emit('nuevaConfiguracion', data)
		}
	}

	const sendLoggedUserInfo = (data = null) => {
		console.log('🔄 Enviando usuario actualizado:', data)
		data === null
			? setServerUserInfo(userInfo) // ✅ This triggers the useEffect automatically
			: setServerUserInfo(data)
	}

	const regarJardin = () => {
		if (clientSocket) {
			console.log('Regando Jardín')
			clientSocket.emit('regarJardin')
		}
	}
	return { arduinoData, sendArduino, setConfiguracionInicial, setNuevaConfiguracion, sendLoggedUserInfo, regarJardin }
}

export default useServer
