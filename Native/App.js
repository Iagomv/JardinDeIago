import React, {useEffect} from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import AppNavigator from './routes/AppNavigator'
import {UserProvider} from './context/UserContext'

export default function App() {
  // useEffect(() => {
  //   requestUserPermission()
  //   getFCMToken()
  //   setupBackgroundHandler()

  //   const unsubscribe = onForegroundNotification()
  //   return () => unsubscribe() // Para limpiar el listener cuando se desmonte
  // }, [])

  return (
    <SafeAreaProvider>
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </SafeAreaProvider>
  )
}
