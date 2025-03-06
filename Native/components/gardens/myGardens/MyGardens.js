import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native'
import MyGarden from './MyGarden'
import {useUserContext} from '../../../context/UserContext'

const MyGardens = ({gardensData}) => {
  const [showGardens, setShowGardens] = useState(false)
  const {userInfo, setUserInfo} = useUserContext()
  const [_, forceUpdate] = useState(0)
  useEffect(() => {
    console.log('User gardens updated:', userInfo)
    forceUpdate((prev) => prev + 1)
  }, [userInfo])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis jardines</Text>

      {/* Botón para mostrar/ocultar jardines */}
      <Pressable style={styles.button} onPress={() => setShowGardens(!showGardens)}>
        <Text style={styles.buttonText}>{showGardens ? 'Ocultar jardines' : 'Adquirir jardines'}</Text>
      </Pressable>

      {showGardens && (
        <FlatList
          data={gardensData.filter((garden) => userInfo.jardines.includes(garden.bioma))}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={({item}) => <MyGarden gardensData={gardensData} gardenData={item} />}
        />
      )}
    </View>
  )
}

export default MyGardens

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
