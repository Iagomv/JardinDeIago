import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import {LogoutButton} from '../components/LogoutButton'
import HistoryScreen from '../screens/HistoryScreen'

// Crear los navegadores
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

// Componente de navegación principal
const AppNavigator = ({isLoggedIn, setIsLoggedIn}) => {
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        // Si no está logueado, se usan las pantallas de Login y Registro
        <Stack.Navigator>
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="Registro">
            {(props) => <RegisterScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
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
              headerRight: () => <LogoutButton setIsLoggedIn={setIsLoggedIn} />
            }}
          />
          <Tab.Screen
            name="Perfil"
            component={ProfileScreen}
            options={{
              headerRight: () => <LogoutButton setIsLoggedIn={setIsLoggedIn} />
            }}
          />
          <Tab.Screen
            name="Historico"
            component={HistoryScreen}
            options={{
              headerRight: () => <LogoutButton setIsLoggedIn={setIsLoggedIn} />
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  )
}

export default AppNavigator
