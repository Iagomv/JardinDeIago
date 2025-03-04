import React from 'react'
import {View, Alert, Button} from 'react-native'
//TODO MODIFICAR ESTADO LOGGEDIN PARA PRODUCCION

export const LogoutButton = ({setIsLoggedIn}) => {
  const onButtonPress = () => {
    alert('Logout')
    setIsLoggedIn(true)
  }
  return (
    <View style={{marginRight: 15}}>
      <Button title="Logout" onPress={() => onButtonPress()} />
    </View>
  )
}
