//*EN ESTE ARCHIVO MANEJAMOS LA CONEXIÓN CON EL SERVIDOR A
// *Recibimos los datos de arduino desde Actualizar actualizarServidores
// * y enviamos datos a arduino a traves del servidor A con sendDataToArduino //

import {io} from 'socket.io-client'
import {enviarDatosACliente} from './conexionCliente.js'
import {guardarRegistrosArduino} from './DB/FireBase.js'
import {guardarConfigArduino} from './DB/FireBase.js'
const serverA = process.env.URL_SERVER_A

export let datosRecibidos = {
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
let socketA
// Estructura de los datos que manejamos para comunicarnos con Arduino
let jsonToArduino = {
  pinSensorAgua: 1,
  pinServo: 30,
  pinFC28: '0',
  pinDht: 52,
  posicionServo: 140,
  retardo: 5
}
export const connectToServerA = (ioServerB) => {
  socketA = io(serverA, {
    reconnection: true, // Intentará reconectar automáticamente
    reconnectionAttempts: 5, // Intentará 5 veces
    reconnectionDelay: 2000 // Esperará 2s entre intentos
  })

  socketA.on('connect', () => onConnect())
  socketA.on('actualizarServidores', (data) => onActualizarServidores(data))
  socketA.on('disconnect', () => {
    console.log('🔴 Desconectado de Servidor A. Intentando reconectar...')
  })
}

const onConnect = () => {
  socketA.emit('registrarServidorB')
  console.log('🟢 Conectado a Servidor A')
}

// Función para manejar los datos recibidos de Servidor A
const onActualizarServidores = (data) => {
  if (data.dato1 == null) {
    let cleanData = data.substring(0, data.length - 1).split(',')

    // Asignar los valores en orden a las claves del objeto datosRecibidos
    datosRecibidos.humedad = cleanData[0]
    datosRecibidos.temperatura = cleanData[1]
    datosRecibidos.temperaturaF = cleanData[2]
    datosRecibidos.calorF = cleanData[3]
    datosRecibidos.calor = cleanData[4]
    datosRecibidos.humedad = cleanData[5]
    datosRecibidos.agua = cleanData[6]
    datosRecibidos.posicion = cleanData[7]
    datosRecibidos.retardo = cleanData[8]
  } else {
    datosRecibidos.humedad = data.dato1
    datosRecibidos.temperatura = data.dato2
    datosRecibidos.temperaturaF = data.dato3
    datosRecibidos.calorF = data.dato4
    datosRecibidos.calor = data.dato5
    datosRecibidos.humedad = data.dato6
    datosRecibidos.agua = data.dato7
    datosRecibidos.posicion = data.dato8
    datosRecibidos.retardo = data.dato9
  }
  enviarDatosACliente(datosRecibidos)
  guardarRegistrosArduino(datosRecibidos)
  console.log('📩 Datos recibidos desde Servidor A ', datosRecibidos)
}

// Función para enviar datos a Arduino
export const sendDataToArduino = (data) => {
  socketA.emit('sendDataToArduino', data)
}

// Función para realizar configuracion de pines inicial en Arduino
export const setConfiguracionInicial = () => {
  console.log('Cliente estableciendo configuracion por defecto')
  guardarConfigArduino(jsonToArduino)
  socketA.emit('configuracionInicial')
}

//Funcion para modificar una configuracion de pines
export const setNuevaConfiguracion = (data) => {
  console.log('Cliente estableciendo nueva configuracion', data)
  socketA.emit('nuevaConfiguracion', data)
  guardarConfigArduino(data)
}
