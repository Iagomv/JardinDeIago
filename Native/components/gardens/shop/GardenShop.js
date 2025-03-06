import {StyleSheet, Text, View, FlatList, Image, Pressable} from 'react-native'
import React from 'react'
import {dam2Running} from '../../../api/Endpoints'
import PlantCardShop from './PlantCardShop'
import useShoppingActions from '../../../Shop/useShoppingActions'

const GardenShop = ({gardenData}) => {
  if (!gardenData || !gardenData.plantasJardin) {
    return <Text style={styles.noData}>No hay plantas en este jardín.</Text>
  }

  const firstPlant = Object.values(gardenData.plantasJardin)[0]
  const plantList = Object.values(gardenData.plantasJardin)
  const [showPlants, setShowPlants] = React.useState(true)
  const {gardenPurchase} = useShoppingActions()
  return (
    <View style={styles.container}>
      {/* Card del Jardín */}
      <View style={styles.card}>
        <Image
          source={
            dam2Running
              ? {uri: firstPlant.planta.imagen}
              : {uri: firstPlant.planta.imagen.replace('dam2.colexio-karbo.com', 'localhost')}
          }
          style={styles.image}
        />
        <View style={styles.row}>
          <Text style={styles.title}>{gardenData.bioma || 'Jardín'}</Text>

          <Pressable style={styles.button} onPress={() => setShowPlants(!showPlants)}>
            <Text style={styles.buttonText}>{showPlants ? 'Ocultar' : '+Info'}</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => gardenPurchase(gardenData.bioma)}>
            <Text style={styles.buttonText}>Adquirir</Text>
          </Pressable>
        </View>
      </View>

      {/* Lista de plantas */}
      {showPlants && (
        <FlatList
          data={plantList}
          horizontal={true}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={({item}) => <PlantCardShop plantData={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  )
}

export default GardenShop

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    padding: 10
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000', // Change to black for visibility
    backgroundColor: 'transparent', // Remove background overlay
    padding: 5
  },
  noData: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20
  },
  list: {
    paddingBottom: 20
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10
  }
})
