import React from 'react'
import {View, Text, Button} from 'react-native'

const LoginScreen = ({setIsLoggedIn}) => {
  const handleLogin = () => {
    setIsLoggedIn(true) // Simulate login
  }

  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Log In" onPress={handleLogin} />
    </View>
  )
}

export default LoginScreen
