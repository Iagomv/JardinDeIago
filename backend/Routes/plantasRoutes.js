import express from 'express'
import {auth} from '../DB/Config.js'
import {insertarPlanta, getPlantas, updatePlanta, deletePlanta} from '../DB/FireBase.js'

const plantasRoutes = express.Router()

plantasRoutes.get('/get', async (req, res) => {
  try {
    const plantas = await getPlantas()
    res.status(200).json(plantas)
  } catch (error) {
    res.status(400).json({error: 'Error al obtener plantas'})
  }
})

plantasRoutes.post('/nueva', async (req, res) => {
  const data = req.body

  if (Array.isArray(data)) {
    // Si es un array, insertamos todas las plantas
    for (const planta of data) {
      const resultado = insertarPlanta(planta)
      if (resultado === 0) {
        return res.status(400).json({error: 'Error al insertar planta'})
      }
    }
    return res.status(200).json({message: '✅ Plantas insertadas con éxito'})
  } else {
    const resultado = insertarPlanta(data)
    return resultado === 0
      ? res.status(400).json({error: 'Error al insertar planta'})
      : res.status(200).json({message: '✅ Planta insertada con éxito'})
  }
})
plantasRoutes.post('/actualizar', async (req, res) => {
  const docId = req.body.id
  console.log('actualizar', docId)
  const response = await updatePlanta(docId, req.body)
  return response == 1
    ? res.status(200).json({message: '✅ Planta actualizada con éxito'})
    : res.status(400).json({error: 'Error al actualizar planta'})
})

plantasRoutes.post('/eliminar', async (req, res) => {
  console.log('eliminar', req.body)
  const docId = req.body.id
  console.log('eliminar', docId)
  const response = await deletePlanta(docId)
  return response == 1
    ? res.status(200).json({message: '✅ Planta eliminada con éxito'})
    : res.status(400).json({error: 'Error al eliminar planta'})
})
export default plantasRoutes
