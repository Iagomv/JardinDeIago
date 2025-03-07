import React, {useState} from 'react'
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {authRegisterError} from '../error/authError'
import {ENDPOINTS} from '../api/Endpoints'
import axios from 'axios'

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const navigation = useNavigation()

  //Handler para registrar a un nuevo usuario tras comprobar formato y existencia de email
  const handleRegistroAsync = async () => {
    if (password !== passwordRepeat) {
      alert('Las contraseñas no coinciden')
      return
    }

    const nuevoUsuario = {email, password}
    await realizarRegistroAsync(nuevoUsuario, navigation)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

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
      <TextInput
        style={styles.input}
        placeholder="Password repeat"
        secureTextEntry
        value={passwordRepeat}
        onChangeText={setPasswordRepeat}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegistroAsync}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Ir a login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default RegisterScreen

const realizarRegistroAsync = async (nuevoUsuario, useNavigation) => {
  console.log('Ejecutando realizarRegistroAsync...')

  try {
    const res = await axios.post(ENDPOINTS.registro, nuevoUsuario)
    console.log('error', res.data)
    setTimeout(() => {
      alert('Registro exitoso ' + nuevoUsuario.email.split('@')[0])
    }, 100)

    if (res.status === 200) {
      setTimeout(() => navigation.navigate('Login'), 1000) // ✅ Usar `setTimeout` en lugar de `setInterval`
    }
  } catch (error) {
    // setTimeout(() => {
    //   alert(`${error.data.error}`)
    // }, 100)
    console.log(error.response)
    authRegisterError(error)
  }
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
