import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'

// Import screens
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const AppNavigator = ({isLoggedIn, setIsLoggedIn}) => {
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator initialRouteName="Login">
          <Tab.Screen name="Login">{() => <LoginScreen setIsLoggedIn={setIsLoggedIn} />}</Tab.Screen>
          <Tab.Screen name="Register">{() => <RegisterScreen setIsLoggedIn={setIsLoggedIn} />}</Tab.Screen>
        </Tab.Navigator>
      )}
    </NavigationContainer>
  )
}

export default AppNavigator
