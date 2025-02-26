import React, {useState} from 'react'
import {Alert} from 'react-native'
import {View, Text, TextInput, Button, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {authRegisterError} from '../error/authError'

const RegisterScreen = ({setIsLoggedIn}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigation()

  //Handler para registrar a un nuevo usuario tras comprobar formato y existencia de email
  const handleRegistro = async (e) => {
    e.preventDefault()
    // Datos del nuevo usuario
    const nuevoUsuario = {
      email,
      password
    }
    try {
      // Enviar los datos al servidor
      const res = await Axios.post(endpoints.registro, nuevoUsuario)
      alert(`${res.data.message}`)
      if (res.status === 200) navigate('/login')
    } catch (error) {
      authRegisterError(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

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

      <Button title="Register" onPress={handleRegistro} />
    </View>
  )
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
    width: '100%', // Ensures it takes full width on mobile
    maxWidth: 400, // Prevents it from getting too wide on web
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff'
  }
})

export default RegisterScreen
