import {StyleSheet, View, Text} from 'react-native'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {ENDPOINTS} from '../api/Endpoints'
import GardensShop from '../components/gardens/shop/GardensShop'
import {ScrollView} from 'react-native-web'
import {useUserContext} from '../context/UserContext'

const ShopScreen = () => {
  const [gardensData, setGardensData] = useState([])
  const {userInfo, isLoggedIn} = useUserContext()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ENDPOINTS.getJardines)
        if (response.status === 200) {
          setGardensData(response.data)
        }
      } catch (error) {
        console.error('Error fetching gardens:', error)
      }
    }
    console.log('userInfo', userInfo)
    fetchData()
  }, [userInfo])

  return (
    <View style={styles.container}>
      <ScrollView>
        <GardensShop gardensData={gardensData} />
      </ScrollView>
    </View>
  )
}

export default ShopScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  list: {
    paddingBottom: 20
  }
})
