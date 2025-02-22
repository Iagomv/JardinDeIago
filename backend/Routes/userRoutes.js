import express from 'express'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../DB/Config.js'
import jwt from 'jsonwebtoken'

const userRoutes = express.Router()

// 👉 Registro de usuario
userRoutes.post('/registro', async (req, res) => {
  console.log('📥 Recibiendo solicitud de registro')
  const {email, password} = req.body

  if (!email || !password) {
    return res.status(400).json({error: 'Email y contraseña son obligatorios'})
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    const token = await user.getIdToken()

    return res.status(201).json({
      message: '✅ Usuario registrado con éxito',
      email: user.email,
      uid: user.uid,
      token
    })
  } catch (error) {
    console.log('❌ Error en registro:', error.code)
    return res.status(400).json({error: error.code})
  }
})

// 👉 Login de usuario
userRoutes.post('/login', async (req, res) => {
  console.log('📥 Recibiendo solicitud de login')
  const {email, password} = req.body

  if (!email || !password) {
    return res.status(400).json({error: 'Email y contraseña son obligatorios'})
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    const token = jwt.sign({uid: user.uid, email: user.email}, process.env.JWT_SECRET, {expiresIn: '2h'})
    console.log('✅ Login exitoso')
    return res.status(200).json({
      message: '✅ Login exitoso',
      token
    })
  } catch (error) {
    console.log('❌ Error en login:', error.code)
    return res.status(400).json({error: error.code})
  }
})

export default userRoutes
