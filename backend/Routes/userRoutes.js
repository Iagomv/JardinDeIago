import express from 'express'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth'
import {insertarUsuario, getUsuarioPorEmail, getUsuarios, updateUsuario, deleteUsuario} from '../DB/FireBase.js'
import {auth} from '../DB/Config.js'
import jwt from 'jsonwebtoken'

const userRoutes = express.Router()

// 👉 CRUD
//Obtener usuarios

userRoutes.get('/get', async (req, res) => {
  try {
    const usuarios = await getUsuarios()
    res.status(200).json(usuarios)
  } catch (error) {
    res.status(400).json({error: 'Error al obtener usuarios'})
  }
})
userRoutes.get('/get/:email', async (req, res) => {
  console.log(req.params.email)
  try {
    const usuario = await getUsuarioPorEmail(req.params.email)
    return usuario === 0 ? res.status(400).json({error: 'Error al obtener usuario'}) : res.status(200).json(usuario)
  } catch (error) {
    res.status(400).json({error: 'Error al obtener usuario'})
  }
})
//Insertar nuevo usuario
userRoutes.post('/post', async (req, res) => {
  try {
    const data = req.body
    const resultado = insertarUsuario(data)
    return resultado === 0
      ? res.status(400).json({error: 'Error al insertar usuario'})
      : res.status(200).json({message: '✅ Usuario insertado con éxito'})
  } catch (error) {
    res.status(400).json({error: 'Error al insertar usuario'})
  }
})
//Actualizar usuario
userRoutes.post('/update', async (req, res) => {
  try {
    const data = req.body
    const resultado = updateUsuario(data)
    console.log('actualizando usuario ', req.body)
    return resultado === 0
      ? res.status(400).json({error: 'Error al actualizar usuario'})
      : res.status(200).json({message: '✅ Usuario actualizado con éxito'})
  } catch (error) {
    res.status(400).json({error: 'Error al actualizar usuario'})
  }
})
//Eliminar usuario
userRoutes.post('/delete', async (req, res) => {
  try {
    const data = req.body
    const resultado = deleteUsuario(data.id)
    console.log('borrando cliente ', data.id)
    return resultado === 0
      ? res.status(400).json({error: 'Error al eliminar usuario'})
      : res.status(200).json({message: '✅ Usuario eliminado con éxito'})
  } catch (error) {
    res.status(400).json({error: 'Error al eliminar usuario'})
  }
})

// 👉 Registro de usuario --> ReactApp y BackOffice
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
    insertarUsuario(user.reloadUserInfo)
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
    const firebaseUserData = await getUsuarioPorEmail(email)
    console.log('✅ Login exitoso')
    return res.status(200).json({
      message: '✅ Login exitoso',
      token,
      userInfo: firebaseUserData
    })
  } catch (error) {
    console.log('❌ Error en login:', error.code)
    return res.status(400).json({error: error.code})
  }
})

// 👉 Recuperación de contraseña
userRoutes.post('/reset-password', async (req, res) => {
  console.log('📥 Recibiendo solicitud de recuperación de contraseña')
  const {email} = req.body

  if (!email) {
    return res.status(400).json({error: 'El email es obligatorio'})
  }

  try {
    await sendPasswordResetEmail(auth, email)
    console.log('📧 Correo de recuperación enviado a:', email)
    return res.status(200).json({message: '✅ Correo de recuperación enviado'})
  } catch (error) {
    console.log('❌ Error en recuperación de contraseña:', error.code)
    return res.status(400).json({error: error.code})
  }
})

export default userRoutes
