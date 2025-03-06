import {dbFirebase} from './Config.js'
import {query, where, collection, getDocs, addDoc, doc, setDoc, deleteDoc, getDoc} from 'firebase/firestore/lite'
import {obtenerFechaActual, obtenerHoraMinutoActual} from '../helper/getDia.js'
let dia = obtenerFechaActual()
let recordTime = 0
const coleccionArduino = collection(dbFirebase, 'ArduinoData')
const coleccionUsuarios = collection(dbFirebase, 'Usuarios')
const coleccionPlantas = collection(dbFirebase, 'Plantas')
const coleccionArticulos = collection(dbFirebase, 'Articulos')
const coleccionJardines = collection(dbFirebase, 'Jardines')
const coleccionEmpleados = collection(dbFirebase, 'Empleados')
export const coleccionConfigRange = collection(dbFirebase, 'ConfiguracionRangos')

const docDia = doc(dbFirebase, `ArduinoData/${dia}`)

//👉 ARDUINO
export const guardarRegistrosArduino = async (data) => {
  dia = obtenerFechaActual()
  if (recordTime === obtenerHoraMinutoActual()) return
  recordTime = obtenerHoraMinutoActual()

  const docDia = doc(dbFirebase, `ArduinoData/${dia}`)
  const subColeccionRegistros = collection(docDia, 'registros')
  const subDocRef = doc(subColeccionRegistros, obtenerHoraMinutoActual()) // Usa la hora actual como ID

  const respuesta = await setDoc(subDocRef, data)
  return respuesta
}
export const guardarConfigArduino = async (data) => {
  const docConfig = doc(dbFirebase, 'ArduinoConfig', 'configuracion') // Referencia al documento único en PNIConfig con id "configuracion"
  const respuesta = await setDoc(docConfig, data, {merge: true})
  return respuesta
}
//Obtener los datos de Arduino a partir de la fecha
export const getDatosArduino = async (fecha) => {
  try {
    const registrosRef = collection(dbFirebase, 'ArduinoData', fecha, 'registros')
    const snapshot = await getDocs(registrosRef)
    // Mapear los datos
    const registros = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))

    return registros
  } catch (error) {
    console.error('Error al obtener datos:', error)
    return 0
  }
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
export const getUsuarioPorEmail = async (email) => {
  const userRef = doc(dbFirebase, 'Usuarios', email)
  const userDoc = await getDoc(userRef)
  const response = userDoc.exists() && userDoc.data() ? userDoc.data() : 0
  return response
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
  console.log('Eliminando usuario', docId)
  try {
    const userRef = doc(dbFirebase, 'Usuarios', docId)
    await deleteDoc(userRef)
    return 1
  } catch (error) {
    return 0
  }
}

//👉 EMPLEADOS
export const getEmpleados = async () => {
  const docsEmpleados = await getDocs(coleccionEmpleados)
  const empleados = []
  docsEmpleados.forEach((doc) => {
    empleados.push({docId: doc.id, ...doc.data()})
  })
  return empleados
}

export const insertarEmpleado = async (data) => {
  try {
    const respuesta = await addDoc(coleccionEmpleados, data)
    return 1
  } catch (error) {
    return 0
  }
}

export const updateEmpleado = async (docId, data) => {
  try {
    const empleadoRef = doc(dbFirebase, 'Empleados', docId)
    const respuesta = await setDoc(empleadoRef, data, {merge: true})
    return 1
  } catch (error) {
    return 0
  }
}

export const deleteEmpleado = async (docId) => {
  try {
    const empleadoRef = doc(dbFirebase, 'Empleados', docId)
    await deleteDoc(empleadoRef)
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

export const deleteJardin = async (docId) => {
  try {
    const jardinRef = doc(dbFirebase, 'Jardines', docId)
    await deleteDoc(jardinRef)
    return 1
  } catch (error) {
    console.error('Error al eliminar el jardin:', error.message) // Mostrar el error detallado
    return 0
  }
}

//👉 REGISTROS
export const getConfig = async () => {
  const nombreColeccion = 'ConfiguracionRangos'
  try {
    const userRef = doc(dbFirebase, nombreColeccion, 'doc')
    const confDoc = await getDoc(userRef)
    return confDoc.data()
  } catch (error) {
    console.log('Error obteniendo la configuración', error)
    return 0
  }
}

export const postConfig = async (data) => {
  try {
    const userRef = doc(dbFirebase, 'ConfiguracionRangos', 'doc')
    const respuesta = await setDoc(userRef, data, {merge: true})
    console.log('Recibiendo configuración', data)
    return 1
  } catch (error) {
    return 0
  }
}
