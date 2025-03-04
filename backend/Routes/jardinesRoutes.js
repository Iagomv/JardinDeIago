import express from 'express'
import {auth} from '../DB/Config.js'
import {insertarJardin, getJardines, updateJardin, deleteJardin} from '../DB/FireBase.js'

const jardinesRoutes = express.Router()

jardinesRoutes.get('/get', async (req, res) => {
  try {
    const jardines = await getJardines()
    res.status(200).json(jardines)
  } catch (error) {
    res.status(400).json({error: 'Error al obtener plantas'})
  }
})

jardinesRoutes.post('/post', async (req, res) => {
  const data = req.body

  if (Array.isArray(data)) {
    // Si es un array, insertamos todas los articulos
    for (const jardin of data) {
      const resultado = insertarJardin(data)
      if (resultado === 0) {
        return res.status(400).json({error: 'Error al insertar planta'})
      }
    }
    return res.status(200).json({message: '✅ Plantas insertadas con éxito'})
  } else {
    const resultado = insertarJardin(data)
    return resultado === 0
      ? res.status(400).json({error: 'Error al insertar planta'})
      : res.status(200).json({message: '✅ Planta insertada con éxito'})
  }
})
jardinesRoutes.post('/update', async (req, res) => {
  const docId = req.body.id
  console.log('actualizar jardin', docId)
  const response = await updateJardin(docId, req.body)
  return response == 1
    ? res.status(200).json({message: '✅ Planta actualizada con éxito'})
    : res.status(400).json({error: 'Error al actualizar planta'})
})

jardinesRoutes.post('/eliminar', async (req, res) => {
  console.log('eliminar jardin', req.body)
  const docId = req.body.id
  console.log('eliminar', docId)
  const response = await deleteJardin(docId)
  return response == 1
    ? res.status(200).json({message: '✅ Planta eliminada con éxito'})
    : res.status(400).json({error: 'Error al eliminar planta'})
})
export default jardinesRoutes
