import express from 'express'
import {auth} from '../DB/Config.js'
import {getDatosArduino} from '../DB/FireBase.js'

const registrosRoutes = express.Router()
registrosRoutes.get('/get', async (req, res) => {
  console.log('Recibiendo solicitud', req.params)
  console.log(req.query.fecha)
  try {
    const datos = await getDatosArduino(req.query.fecha)
    res.status(200).json(datos)
  } catch (error) {
    res.status(400).json({error: 'Error al obtener los registros'})
  }
})

export default registrosRoutes
