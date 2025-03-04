import {useState, useEffect} from 'react'
import {io} from 'socket.io-client'
import {SOCKET_LOCALHOST_SERVERB} from '../api/Endpoints'
const useServer = () => {
  const [arduinoData, setArduinoData] = useState(null)
  const [clientSocket, setClientSocket] = useState(null)

  useEffect(() => {
    const socket = io(SOCKET_LOCALHOST_SERVERB, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000
    })

    socket.on('connect', () => {
      console.log('🟢 Conectado al servidor')
      socket.emit('registrarServidorB')
    })

    socket.on('datosActualizados', (data) => {
      setArduinoData(data)
      console.log('📩 Datos recibidos:', data)
    })

    socket.on('disconnect', () => {
      console.log('🔴 Desconectado del servidor. Intentando reconectar...')
    })

    setClientSocket(socket)

    // ✅ Limpiar conexión al desmontar el componente
    return () => {
      socket.disconnect()
    }
  }, [])

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

  return {arduinoData, sendArduino, setConfiguracionInicial, setNuevaConfiguracion}
}

export default useServer
