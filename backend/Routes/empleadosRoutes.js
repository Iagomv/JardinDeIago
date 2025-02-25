import express from 'express'
import {getEmpleados, insertarEmpleado, updateEmpleado, deleteEmpleado} from '../DB/FireBase.js'

const empleadosRoutes = express.Router()

empleadosRoutes.get('/get', async (req, res) => {
  try {
    const empleados = await getEmpleados()
    res.status(200).json(empleados)
  } catch (error) {
    res.status(400).json({error: 'Error al obtener empleados'})
  }
})

empleadosRoutes.post('/post', async (req, res) => {
  const data = req.body
  delete data.docId
  if (Array.isArray(data)) {
    // Si es un array, insertamos todas los empleados
    for (const empleado of data) {
      const resultado = await insertarEmpleado(empleado)
      if (resultado === 0) {
        return res.status(400).json({error: 'Error al insertar empleado'})
      }
    }
    return res.status(200).json({message: '✅ Empleados insertados con éxito'})
  }
  const resultado = await insertarEmpleado(data)
  return resultado === 0
    ? res.status(400).json({error: 'Error al insertar empleado'})
    : res.status(200).json({message: '✅ Empleado insertado con éxito'})
})

empleadosRoutes.post('/put', async (req, res) => {
  console.log('Recibiendo solicitud de actualizar empleado ', req.body)
  const docId = req.body.docId
  const data = req.body
  delete data.docId
  const resultado = updateEmpleado(docId, data)
  return resultado === 0
    ? res.status(400).json({error: 'Error al actualizar empleado'})
    : res.status(200).json({message: '✅ Empleado actualizado con éxito'})
})

empleadosRoutes.post('/delete', async (req, res) => {
  console.log('Recibiendo solicitud de eliminar empleado ', req.body)
  const data = req.body
  const resultado = deleteEmpleado(data.id)
  return resultado === 0
    ? res.status(400).json({error: 'Error al eliminar empleado'})
    : res.status(200).json({message: '✅ Empleado eliminado con éxito'})
})

export default empleadosRoutes
