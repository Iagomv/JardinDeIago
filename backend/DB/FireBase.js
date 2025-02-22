import {dbFirebase} from './Config.js'
import {query, where, collection, getDocs, addDoc, doc, setDoc} from 'firebase/firestore/lite'
import {obtenerFechaActual} from '../helper/getDia.js'
let dia = obtenerFechaActual()
const coleccionArduino = collection(dbFirebase, 'ArduinoData')
const docDia = doc(dbFirebase, `ArduinoData/${dia}`)

export const guardarRegistrosArduino = async (data) => {
  dia = obtenerFechaActual()
  const subColeccion = collection(docDia, 'registros')
  const respuesta = await addDoc(subColeccion, data)
  return respuesta
}
export const guardarConfigArduino = async (data) => {
  const docConfig = doc(dbFirebase, 'ArduinoConfig', 'configuracion') // Referencia al documento único en PNIConfig con id "configuracion"
  const respuesta = await setDoc(docConfig, data, {merge: true})
  return respuesta
}

const observarCambios = (coleccion) => {
  return coleccion.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      console.log('Cambio detectado:', change)
    })
  })
}
