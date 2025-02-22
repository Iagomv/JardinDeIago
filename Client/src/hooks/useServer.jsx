import {useState, useEffect} from 'react'
import {io} from 'socket.io-client'

const useServer = () => {
  const SERVER_B_URL = 'http://localhost:5000'
  const [arduinoData, setArduinoData] = useState(null)
  const [clientSocket, setClientSocket] = useState(null)

  useEffect(() => {
    const socket = io(SERVER_B_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000
    })

    socket.on('connect', () => {
      console.log('🟢 Conectado a Servidor B')
      socket.emit('registrarServidorB')
    })

    socket.on('datosActualizados', (data) => {
      setArduinoData(data)
      console.log('📩 Datos recibidos:', data)
    })

    socket.on('disconnect', () => {
      console.log('🔴 Desconectado de Servidor B. Intentando reconectar...')
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
      console.log('Nueva config')
      clientSocket.emit('nuevaConfiguracion', data)
    }
  }
  return {arduinoData, sendArduino, setConfiguracionInicial, setNuevaConfiguracion}
}

export default useServer
