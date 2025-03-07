import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View, TextInput, ScrollView, Pressable} from 'react-native'
import {useUserContext} from '../../../context/UserContext'
import {ENDPOINTS} from '../../../api/Endpoints'
import {myAlert} from '../../../error/myAlert'
import axios from 'axios'

const GardenRangeConfiguration = ({gardenData}) => {
  const {userInfo, setUserInfo, updateUserInfo} = useUserContext()
  const [userGardenRangeConfig, setUserGardenRangeConfig] = useState({
    temperaturaMin: '',
    temperaturaMax: '',
    calorMin: '',
    calorMax: '',
    humedadMin: '',
    humedadMax: '',
    aguaMin: '',
    aguaMax: ''
  })
  const [changeFlag, setChangeFlag] = useState(false)

  useEffect(() => {
    if (!userInfo || !gardenData?.bioma) return

    if (!userInfo.gardenRangeConfig) {
      setUserInfo((prev) => ({...prev, gardenRangeConfig: {}}))
    }

    if (userInfo.gardenRangeConfig?.[gardenData.bioma]) return

    const fetchDefaultRange = async () => {
      try {
        const res = await axios.get(`${ENDPOINTS.getGardenConfig}${gardenData.bioma}`)
        if (res.data) {
          setUserInfo((prev) => ({
            ...prev,
            gardenRangeConfig: {
              ...prev.gardenRangeConfig,
              [gardenData.bioma]: res.data
            }
          }))
        }
      } catch (error) {
        myAlert('error', error.message)
      }
    }
    fetchDefaultRange()
  }, [userInfo, gardenData?.bioma])

  useEffect(() => {
    if (!userInfo?.gardenRangeConfig?.[gardenData?.bioma]) return
    if (JSON.stringify(userInfo.gardenRangeConfig[gardenData.bioma]) === JSON.stringify(userGardenRangeConfig)) return

    setUserGardenRangeConfig(userInfo.gardenRangeConfig[gardenData.bioma])
  }, [userInfo, gardenData?.bioma])

  const handleInputChange = (key, value) => {
    setUserGardenRangeConfig((prev) => ({
      ...prev,
      [key]: value.replace(/[^0-9-]/g, '')
    }))
  }

  const saveChanges = async () => {
    await setUserInfo((prev) => ({
      ...prev,
      gardenRangeConfig: {
        ...prev.gardenRangeConfig,
        [gardenData.bioma]: userGardenRangeConfig
      }
    }))
    setChangeFlag(true)

    myAlert('success', 'Cambios guardados correctamente')
  }

  useEffect(() => {
    const run = async () => {
      await updateUserInfo()
    }
    run()
    setChangeFlag(false)
  }, [changeFlag])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Configuración del Rango del Jardín</Text>

      {Object.keys(userGardenRangeConfig).map((key) => (
        <View key={key} style={styles.inputContainer}>
          <Text style={styles.label}>{key}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(userGardenRangeConfig[key])}
            onChangeText={(value) => handleInputChange(key, value)}
          />
        </View>
      ))}
      <Pressable style={styles.button} onPress={() => saveChanges()}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  inputContainer: {
    marginBottom: 10
  },
  label: {
    fontSize: 16,
    fontWeight: '600'
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
})

export default GardenRangeConfiguration
