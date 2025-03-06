import React from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import AppNavigator from './routes/AppNavigator'
import {UserProvider} from './context/UserContext'

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </SafeAreaProvider>
  )
}
