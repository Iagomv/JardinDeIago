import React, {useEffect, useState} from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import axios from 'axios'
import {ENDPOINTS} from '../api/Endpoints'
import {useUserContext} from '../context/UserContext'

import MyGardens from '../components/gardens/myGardens/MyGardens'

const ProfileScreen = () => {
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
      <Text style={styles.title}>Profile Screen</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <MyGardens gardensData={gardensData} setGardensData={setGardensData} />
      </ScrollView>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures View takes up full screen
    backgroundColor: '#f4f4f4', // Light gray background
    padding: 15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10
  },
  scrollContainer: {
    flexGrow: 1, // Allows the ScrollView to grow and be scrollable
    paddingBottom: 20 // Prevents content from getting cut off at the bottom
  }
})
