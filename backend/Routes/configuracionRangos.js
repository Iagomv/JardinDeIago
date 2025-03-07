import {config} from 'dotenv'
import express from 'express'
import {getConfig, getGardenConfig, postConfig, postGardenConfig} from '../DB/FireBase.js'
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

configuracionRangosRoutes.get('/:bioma', async (req, res) => {
  console.log(req.params)
  const bioma = req.params.bioma
  const response = await getGardenConfig(bioma)
  response === 0 ? res.status(400).json({error: 'Error al obtener configuración de rangos'}) : res.send(response)
})
//Endpoint para actualizar la configuracion
configuracionRangosRoutes.post('/', async (req, res) => {
  const jungleConfig = AutomaticJunglaBiomaConfiguration(req.body)
  const desertConfig = AutomaticDesertBiomaConfiguration(req.body)
  const mediterraneanConfig = AutomaticMediterraneoBiomaConfiguration(req.body)
  const articConfig = AutomaticArticoBiomaConfiguration(req.body)
  console.log('solicitud recibida en configRangosRoutes', req.body)
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
    await Promise.all([
      postConfig(req.body),
      postGardenConfig(jungleConfig, 'jungla'),
      postGardenConfig(desertConfig, 'desierto'),
      postGardenConfig(mediterraneanConfig, 'mediterraneo'),
      postGardenConfig(articConfig, 'artico')
    ])

    res.status(200).json({message: 'Configuración actualizada exitosamente'})
  } catch (error) {
    res.status(500).json({error: 'Error al actualizar configuración', details: error})
  }
})

// Configuraciones automaticas
const AutomaticDesertBiomaConfiguration = (data) => {
  return {
    temperaturaMin: data.temperaturaMin + 10,
    temperaturaMax: data.temperaturaMax + 10,
    calorMin: data.calorMin + 10,
    calorMax: data.calorMax + 10,
    humedadMin: data.humedadMin - 20,
    humedadMax: data.humedadMax - 20,
    aguaMin: data.aguaMin - 20,
    aguaMax: data.aguaMax - 20
  }
}

const AutomaticJunglaBiomaConfiguration = (data) => {
  return {
    temperaturaMin: data.temperaturaMin - 10,
    temperaturaMax: data.temperaturaMax - 10,
    calorMin: data.calorMin - 10,
    calorMax: data.calorMax - 10,
    humedadMin: data.humedadMin + 20,
    humedadMax: data.humedadMax + 20,
    aguaMin: data.aguaMin + 20,
    aguaMax: data.aguaMax + 20
  }
}

const AutomaticMediterraneoBiomaConfiguration = (data) => {
  return {
    temperaturaMin: data.temperaturaMin,
    temperaturaMax: data.temperaturaMax,
    calorMin: data.calorMin,
    calorMax: data.calorMax,
    humedadMin: data.humedadMin,
    humedadMax: data.humedadMax,
    aguaMin: data.aguaMin,
    aguaMax: data.aguaMax
  }
}

const AutomaticArticoBiomaConfiguration = (data) => {
  return {
    temperaturaMin: data.temperaturaMin - 20,
    temperaturaMax: data.temperaturaMax - 20,
    calorMin: data.calorMin - 20,
    calorMax: data.calorMax - 20,
    humedadMin: data.humedadMin + 10,
    humedadMax: data.humedadMax + 10,
    aguaMin: data.aguaMin + 10,
    aguaMax: data.aguaMax + 10
  }
}
export default configuracionRangosRoutes
