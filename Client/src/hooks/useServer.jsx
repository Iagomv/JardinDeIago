import {useState, useEffect} from 'react'
import {io} from 'socket.io-client'

const useServer = () => {
  const socket = io('http://localhost:4003')
  const [arduinoData, setArduinoData] = useState(null)

  useEffect(() => {
    socket.emit('registrarServidorPersonal', (data) => onRegistro(data))

    return () => {
      socket.disconnect()
    }
  }, [])

  const sendArduino = (data) => {
    socket.emit('enviarArduino', data)
  }

  const onRegistro = (data) => {
    setArduinoData(data)
    console.log('Datos recibidos:', data)
  }
  return {arduinoData, sendArduino}
}

export default useSocket
