import {io} from 'socket.io-client'

const URL_SERVER_A = 'http://localhost:4003'

const datosRecibidos = {
  humedad: 0,
  temperatura: 0,
  temperaturaF: 0,
  calorF: 0,
  calor: 0,
  humedad: 0,
  agua: 0,
  posicion: 0,
  retardo: 0
}
export const connectToServerA = (ioServerB) => {
  const socketA = io(URL_SERVER_A, {
    reconnection: true, // Intentará reconectar automáticamente
    reconnectionAttempts: 5, // Intentará 5 veces
    reconnectionDelay: 2000 // Esperará 2s entre intentos
  })

  socketA.on('connect', () => {
    socketA.emit('registrarServidorB')
    socketA.emit('configuracionInicial')
    console.log('🟢 Conectado a Servidor A')
  })
  socketA.on('actualizarServidores', (data) => onActualizarServidores(data))
  socketA.on('disconnect', () => {
    console.log('🔴 Desconectado de Servidor A. Intentando reconectar...')
  })

  socketA.on('connect_error', (error) => {
    console.error('⚠️ Error al conectar con Servidor A:', error.message)
  })

  // Recibir datos de Servidor A y enviarlos a clientes de Servidor B
  socketA.on('notificacion', (data) => {
    console.log('📩 Datos recibidos de Servidor A:', data)
    ioServerB.emit('datosActualizados', data) // Enviar a clientes conectados
  })
}

const onActualizarServidores = (data) => {
  let cleanData = data.substring(0, data.length - 1).split(',')

  // Asignar los valores en orden a las claves del objeto datosRecibidos
  datosRecibidos.humedad = cleanData[0]
  datosRecibidos.temperatura = cleanData[1]
  datosRecibidos.temperaturaF = cleanData[2]
  datosRecibidos.calorF = cleanData[3]
  datosRecibidos.calor = cleanData[4]
  datosRecibidos.humedad = cleanData[5] // Parece un duplicado, revisa si es correcto
  datosRecibidos.agua = cleanData[6]
  datosRecibidos.posicion = cleanData[7]
  datosRecibidos.retardo = cleanData[8]

  console.log(datosRecibidos)
}
