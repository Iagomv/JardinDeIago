import React from 'react'
import {View, Text, Button} from 'react-native'

const Navbar = ({isLoggedIn, setIsLoggedIn}) => {
  return (
    <View>
      <Text>{isLoggedIn ? 'Welcome Back!' : 'Please Log In'}</Text>
      {isLoggedIn ? (
        <Button title="Log Out" onPress={() => setIsLoggedIn(false)} />
      ) : (
        <Button title="Log In" onPress={() => setIsLoggedIn(true)} />
      )}
    </View>
  )
}

export default Navbar
