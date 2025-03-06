import React, {useState} from 'react'
import {View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {ENDPOINTS} from '../api/Endpoints'
import axios from 'axios'
import {myAlert} from '../error/myAlert'
import {useUserContext} from '../context/UserContext'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  const {login, setIsLoggedIn} = useUserContext()

  // Handler para el login
  const handleLoginAsync = async () => {
    if (!validateInfoLogin(email, password)) return
    const usuario = {email, password}
    await realizarLoginAsync(usuario, login, navigation)
  }

  // Handler para resetear la contraseña
  const handleResetPasswordAsync = async () => {
    if (!email || !validateEmail(email)) {
      myAlert('Error', 'Por favor introduce un email válido')
      return
    }

    await realizarResetPasswordAsync(email, setEmail)
  }
  // Render
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLoginAsync}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleResetPasswordAsync}>
        <Text style={styles.buttonText}>Recuperar contraseña</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen

const realizarLoginAsync = async (usuario, login, navigation) => {
  console.log('🔄 Ejecutando realizarLoginAsync...')
  try {
    const res = await axios.post(ENDPOINTS.login, usuario)
    console.log('✅ Login response:', res.data) // Log the response

    if (res.status === 200) {
      const {userInfo} = res.data
      login(userInfo)
      navigation.navigate('Home')
    }
  } catch (error) {
    console.error('❌ Error en login:', error)
  }
}

const realizarResetPasswordAsync = async (email, setEmail) => {
  console.log('Ejecutando realizarResetPasswordAsync...')

  try {
    const res = await axios.post(ENDPOINTS.resetPassword, {email})

    console.log('Respuesta del servidor:', res.data)

    if (res.status === 200) {
      myAlert('Success', 'El email de recuperación ha sido enviado correctamente.')
      setEmail('')
    }
  } catch (error) {
    console.error('Error en la solicitud de restablecer contraseña:', error)
    alert('Error', 'Hubo un problema al enviar el correo de recuperación.')
  }
}

const validateInfoLogin = (email, password) => {
  if (!email || !password) {
    myAlert('Error', 'Debes completar ambos campos')
    return false
  }
  if (!validateEmail(email)) {
    myAlert('Error', 'Por favor introduce un email válido')
    return false
  }
  if (password.length < 6) {
    myAlert('Error', 'La contraseña debe tener al menos 6 caracteres')
    return false
  }
  return true
}

// Validar Email con Regex
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '100%',
    maxWidth: 400,
    height: 50,
    borderWidth: 1,
    textAlign: 'center',
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff'
  },
  button: {
    width: '100%',
    maxWidth: 200,
    backgroundColor: '#007bff', // Color del botón
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff', // Color del texto
    fontSize: 16,
    fontWeight: 'bold'
  }
})
