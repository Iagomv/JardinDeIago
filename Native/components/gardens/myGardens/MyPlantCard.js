import React, {useEffect, useState} from 'react'
import {View, StyleSheet} from 'react-native'
import {Card, Title, Paragraph, Button} from 'react-native-paper'
import useShoppingActions from '../../../Shop/useShoppingActions'
import {myConfirm} from '../../../error/myConfirm'

const MyPlantCard = ({plantData, gardenData, gardensData, setGardensData}) => {
  const [planta, setPlanta] = useState({})
  const [cantidad, setCantidad] = useState('')
  const {plantPurchase} = useShoppingActions()

  useEffect(() => {
    setPlanta(plantData.planta)
    setCantidad(plantData.cantidad)
  }, [])

  const pressComprar = () => {
    const onConfirm = () => {
      plantPurchase(gardensData, gardenData, plantData, setGardensData)
      setCantidad(cantidad + 1)
    }
    myConfirm('¿Desea comprar esta planta?', onConfirm, () => {})
  }
  return (
    <View style={styles.container}>
      {comprobarDatos(planta) && (
        <Card style={styles.card}>
          {/* Imagen de la planta */}
          {planta.imagen && <Card.Cover source={{uri: planta.imagen}} />}
          {/* Contenido de la tarjeta */}
          <Card.Content>
            <Title>{planta.nombre}</Title>
            <Paragraph>🌍 Bioma: {planta.bioma}</Paragraph>
            <Paragraph>
              🌡️ Temperatura: {planta.temperatura.min}°C - {planta.temperatura.max}°C
            </Paragraph>
            <Paragraph>
              💧 Humedad: {planta.humedad.min}% - {planta.humedad.max}%
            </Paragraph>
            <Paragraph>💲 Precio: {planta.precio}€</Paragraph>
            <Paragraph> Cantidad: {cantidad}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={() => pressComprar(gardensData, gardenData, plantData)}>
              Comprar
            </Button>
          </Card.Actions>
        </Card>
      )}
    </View>
  )
}

const comprobarDatos = (planta) => {
  return planta.bioma && planta.temperatura && planta.humedad && planta.precio && planta.imagen
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  card: {
    width: '90%',
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden'
  }
})

export default MyPlantCard
