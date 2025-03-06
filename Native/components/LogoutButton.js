import React from 'react'
import {View, Alert, Button} from 'react-native'
import {useUserContext} from '../context/UserContext'

export const LogoutButton = () => {
  const {logout} = useUserContext()
  const onButtonPress = () => {
    alert('Logout')
    logout()
  }
  return (
    <View style={{marginRight: 15}}>
      <Button title="Logout" onPress={() => onButtonPress()} />
    </View>
  )
}
