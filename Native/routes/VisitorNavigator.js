import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

// Import screens
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

const Stack = createNativeStackNavigator()

export const VisitorNavigator = ({isLoggedIn, setIsLoggedIn}) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login">{() => <LoginScreen setIsLoggedIn={setIsLoggedIn} />}</Stack.Screen>
      <Stack.Screen name="Register">{() => <RegisterScreen setIsLoggedIn={setIsLoggedIn} />}</Stack.Screen>
    </Stack.Navigator>
  )
}
