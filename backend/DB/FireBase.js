import {dbFirebase} from './Config.js'
import {query, where, collection, getDocs, addDoc, doc, setDoc, deleteDoc} from 'firebase/firestore/lite'
import {obtenerFechaActual} from '../helper/getDia.js'
let dia = obtenerFechaActual()
const coleccionArduino = collection(dbFirebase, 'ArduinoData')
const coleccionUsuarios = collection(dbFirebase, 'Usuarios')
const coleccionPlantas = collection(dbFirebase, 'Plantas')
const coleccionArticulos = collection(dbFirebase, 'Articulos')
const coleccionJardines = collection(dbFirebase, 'Jardines')

const docDia = doc(dbFirebase, `ArduinoData/${dia}`)

//👉 ARDUINO
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

// 👉 Clientes
export const getUsuarios = async () => {
  const querySnapshot = await getDocs(coleccionUsuarios)
  const usuarios = []
  querySnapshot.forEach((doc) => {
    usuarios.push({id: doc.id, ...doc.data()})
  })
  return usuarios
}
export const insertarUsuario = async (data) => {
  const insertData = {
    ...data,
    jardines: []
  }
  try {
    const docConfig = doc(dbFirebase, 'Usuarios', data.email)
    const respuesta = await setDoc(docConfig, insertData, {merge: true})
    return 1
  } catch (error) {
    return 0
  }
}
export const updateUsuario = async (data) => {
  try {
    const userRef = doc(dbFirebase, 'Usuarios', data.id)
    const respuesta = await setDoc(userRef, data, {merge: true})
    return 1
  } catch (error) {
    return 0
  }
}
export const deleteUsuario = async (docId) => {
  try {
    const userRef = doc(dbFirebase, 'Usuarios', docId)
    await deleteDoc(userRef)
    return 1
  } catch (error) {
    return 0
  }
}

// 👉 PLANTAS
export const insertarPlanta = async (data) => {
  delete data.id
  try {
    const respuesta = await addDoc(coleccionPlantas, data)
    return 1
  } catch (error) {
    return 0
  }
}

export const getPlantas = async () => {
  const querySnapshot = await getDocs(coleccionPlantas)
  const plantas = []
  querySnapshot.forEach((doc) => {
    plantas.push({id: doc.id, ...doc.data()})
  })
  return plantas
}

export const updatePlanta = async (docId, data) => {
  try {
    const plantaRef = doc(dbFirebase, 'Plantas', docId)
    const respuesta = await setDoc(plantaRef, data, {merge: true})
    return 1
  } catch (error) {
    return 0
  }
}

export const deletePlanta = async (docId) => {
  try {
    const plantaRef = doc(dbFirebase, 'Plantas', docId)
    await deleteDoc(plantaRef)
    return 1
  } catch (error) {
    console.error('Error al eliminar la planta:', error.message) // Mostrar el error detallado
    return 0
  }
}

//👉 ARTICULOS

export const getArticulos = async () => {
  const querySnapshot = await getDocs(coleccionArticulos)
  const articulos = []
  querySnapshot.forEach((doc) => {
    articulos.push({id: doc.id, ...doc.data()})
  })
  return articulos
}

export const insertarArticulo = async (data) => {
  delete data.id
  try {
    const respuesta = await addDoc(coleccionArticulos, data)
    return 1
  } catch (error) {
    return 0
  }
}

export const updateArticulo = async (docId, data) => {
  try {
    const plantaRef = doc(dbFirebase, 'Articulos', docId)
    const respuesta = await setDoc(plantaRef, data, {merge: true})
    return 1
  } catch (error) {
    return 0
  }
}

export const deleteArticulo = async (docId) => {
  try {
    const plantaRef = doc(dbFirebase, 'Articulos', docId)
    await deleteDoc(plantaRef)
    return 1
  } catch (error) {
    console.error('Error al eliminar el articulo:', error.message) // Mostrar el error detallado
    return 0
  }
}

//👉 JARDINES
export const getJardines = async () => {
  const querySnapshot = await getDocs(coleccionJardines)
  const jardines = []
  querySnapshot.forEach((doc) => {
    jardines.push({id: doc.id, ...doc.data()})
  })
  return jardines
}

export const insertarJardin = async (data) => {
  delete data.id
  try {
    const respuesta = await addDoc(coleccionJardines, data)
    return 1
  } catch (error) {
    return 0
  }
}

export const updateJardin = async (docId, data) => {
  try {
    const jardinRef = doc(dbFirebase, 'Jardines', docId)
    const respuesta = await setDoc(jardinRef, data, {merge: true})
    return 1
  } catch (error) {
    return 0
  }
}
