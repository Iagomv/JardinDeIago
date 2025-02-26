import React, {useState} from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import AppNavigator from './routes/AppNavigator'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <SafeAreaProvider>
      <AppNavigator isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </SafeAreaProvider>
  )
}
