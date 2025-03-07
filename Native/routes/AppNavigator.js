// src/navigation/AppNavigator.js
import React, {useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import {LogoutButton} from '../components/LogoutButton'
import HistoryScreen from '../screens/HistoryScreen'
import ShopScreen from '../screens/ShopScreen'
import {useUserContext} from '../context/UserContext' // Importa el hook

// Crear los navegadores
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const AppNavigator = () => {
  const {isLoggedIn, setIsLoggedIn, userInfo, login, logout} = useUserContext()
  useEffect(() => {
    console.log('📢 userInfo changed:', userInfo)
  }, [userInfo])
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        // Si está logueado, mostrar la navegación de Tabs
        <Tab.Navigator
          screenOptions={{
            headerTitleAlign: 'center'
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerRight: () => <LogoutButton />
            }}
          />
          <Tab.Screen
            name="Perfil"
            component={ProfileScreen}
            options={{
              headerRight: () => <LogoutButton />
            }}
          />
          <Tab.Screen
            name="Historico"
            component={HistoryScreen}
            options={{
              headerRight: () => <LogoutButton />
            }}
          />
          <Tab.Screen
            name="Tienda"
            component={ShopScreen}
            options={{
              headerRight: () => <LogoutButton />
            }}
          />
        </Tab.Navigator>
      ) : (
        // Si no está logueado, se usan las pantallas de Login y Registro
        <Stack.Navigator>
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} login={login} />}
          </Stack.Screen>
          <Stack.Screen name="Registro">
            {(props) => <RegisterScreen {...props} setIsLoggedIn={setIsLoggedIn} login={login} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default AppNavigator
