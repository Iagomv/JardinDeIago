import express from 'express'
import {auth} from '../DB/Config.js'
import {insertarArticulo, getArticulos, updateArticulo, deleteArticulo} from '../DB/FireBase.js'

const articulosRoutes = express.Router()

articulosRoutes.get('/get', async (req, res) => {
  try {
    const plantas = await getArticulos()
    res.status(200).json(plantas)
  } catch (error) {
    res.status(400).json({error: 'Error al obtener plantas'})
  }
})

articulosRoutes.post('/post', async (req, res) => {
  const data = req.body

  if (Array.isArray(data)) {
    // Si es un array, insertamos todas los articulos
    for (const art of data) {
      const resultado = insertarArticulo(art)
      if (resultado === 0) {
        return res.status(400).json({error: 'Error al insertar planta'})
      }
    }
    return res.status(200).json({message: '✅ Plantas insertadas con éxito'})
  } else {
    const resultado = insertarArticulo(data)
    return resultado === 0
      ? res.status(400).json({error: 'Error al insertar planta'})
      : res.status(200).json({message: '✅ Planta insertada con éxito'})
  }
})
articulosRoutes.post('/actualizar', async (req, res) => {
  const docId = req.body.id
  console.log('actualizar', docId)
  const response = await updateArticulo(docId, req.body)
  return response == 1
    ? res.status(200).json({message: '✅ Planta actualizada con éxito'})
    : res.status(400).json({error: 'Error al actualizar planta'})
})

articulosRoutes.post('/eliminar', async (req, res) => {
  console.log('eliminar', req.body)
  const docId = req.body.id
  console.log('eliminar', docId)
  const response = await deleteArticulo(docId)
  return response == 1
    ? res.status(200).json({message: '✅ Planta eliminada con éxito'})
    : res.status(400).json({error: 'Error al eliminar planta'})
})
export default articulosRoutes
