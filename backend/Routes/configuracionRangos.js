import {config} from 'dotenv'
import express from 'express'
import {getConfig, postConfig} from '../DB/FireBase.js'
const configuracionRangosRoutes = express.Router()

export let configRange = {
  temperaturaMin: 0,
  temperaturaMax: 0,
  calorMin: 0,
  calorMax: 0,
  humedadMin: 0,
  humedadMax: 0,
  aguaMin: 0,
  aguaMax: 0
}

//Endpoint para obtener la configuracion actual
configuracionRangosRoutes.get('/', async (req, res) => {
  const response = await getConfig()
  response === 0 ? res.status(400).json({error: 'Error al obtener configuración de rangos'}) : res.send(response)
})

//Endpoint para actualizar la configuracion
configuracionRangosRoutes.post('/', async (req, res) => {
  console.log(req.body) // Verifica qué datos llegan realmente

  const requiredFields = [
    'temperaturaMin',
    'temperaturaMax',
    'calorMin',
    'calorMax',
    'humedadMin',
    'humedadMax',
    'aguaMin',
    'aguaMax'
  ]

  const isValid = requiredFields.every((field) => field in req.body)

  if (!isValid) {
    return res.status(400).json({error: 'Faltan campos en la configuración'})
  }

  try {
    await postConfig(req.body)
    res.status(200).json({message: 'Configuración actualizada exitosamente'})
  } catch (error) {
    res.status(500).json({error: 'Error al actualizar configuración', details: error})
  }
})

export default configuracionRangosRoutes
