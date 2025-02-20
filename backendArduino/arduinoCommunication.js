import {SerialPort} from 'serialport'
import {ReadlineParser} from 'serialport'
import {actualizarServidores} from './socketHandler.js'

const portCom = 'COM10' // En Linux o Mac
const port = new SerialPort({path: portCom, baudRate: 9600})

// Parser para leer las líneas de datos
const parser = port.pipe(new ReadlineParser({delimiter: '\n'}))

// Conexión con Arduino
port.on('open', () => onOpen())
port.on('error', (err) => console.error('Error:', err))
parser.on('data', (data) => getArduinoData(data))

//Estructura de los datos que manejamos para comunicarnos con Arduino
let jsonToArduino = {
  pinSensorAgua: 1,
  pinServo: 30,
  pinFC28: '0',
  pinDht: 52,
  posicionServo: 140,
  retardo: 5
}

// Funcion que se ejecuta cuando se abre el puerto serie
const onOpen = () => {
  console.log('Puerto serie abierto')
}

// Función para enviar datos a Arduino
export const sendArduino = (data) => {
  let arduinoString =
    data.pinSensorAgua +
    ',' +
    data.pinServo +
    ',' +
    data.pinFC28 +
    ',' +
    data.pinDht +
    ',' +
    data.posicionServo +
    ',' +
    data.retardo
  port.write(arduinoString + '\n', (err) => {
    if (err) return console.error('Error al enviar:', err)
  })
}

// Función para recibir datos de Arduino
export const getArduinoData = (data) => {
  console.log('datos recibidos de arduino', data)
  actualizarServidores(data)
}

//Funcion para establecer la configuracion por defecto
export const setConfiguracionInicial = () => {
  console.log('Estableciendo configuracion por defecto')
  sendArduino(jsonToArduino)
}
