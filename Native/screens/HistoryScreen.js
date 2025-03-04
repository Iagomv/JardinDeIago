import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, Button, StyleSheet} from 'react-native'
import axios from 'axios'
import {myAlert} from '../error/myAlert'
import {ENDPOINTS} from '../api/Endpoints'
import SelectChart from '../components/charts/SelectChart'
import SingleChart from '../components/charts/SingleChart'

const HistoryScreen = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [inputValue, setInputValue] = useState('') //Fecha introducida por el usuario
  const [tipo, setTipo] = useState('')
  const [tiposPosibles, setTiposPosibles] = useState([])
  const [rangoTiempo, setRangoTiempo] = useState(0)
  const rangosTiempoPosibles = {
    '15min': 0,
    '1hora': 1,
    '6horas': 2,
    dia: 3
  }

  useEffect(() => {
    const tiposData = data[0] ? Object.keys(data[0]) : []
    setTiposPosibles(tiposData)
  }, [data])

  // Fetch data based on the provided date (fecha)
  const fetchData = async () => {
    try {
      console.log('inputValue', inputValue)

      const res = await axios.get(`${ENDPOINTS.historico}?fecha=${inputValue}`)
      if (res.status === 200) {
        console.log(res.data)
        setData(res.data)
        setLoading(false)
      } else if (res.status === 400) {
        myAlert('Error', 'No se encontraron registros')
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message)
      myAlert('Error', 'An error occurred while fetching the data.')
    }
  }

  const renderGrafico = () => {
    return (
      <View>
        <SelectChart
          tipo={tipo}
          setTipo={setTipo}
          tiposPosibles={tiposPosibles}
          rangoTiempo={rangoTiempo}
          setRangoTiempo={setRangoTiempo}
          rangosTiempoPosibles={rangosTiempoPosibles}
        />
        <SingleChart data={data} tipo={tipo} rangoTiempo={rangoTiempo} />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ingrese una fecha:</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
        placeholder="Escribe una fecha (ej. 27022025)"
      />
      <Button title="Enviar" onPress={() => fetchData()} />

      {loading ? <Text>Cargando...</Text> : renderGrafico()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  label: {
    fontSize: 18,
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 10
  }
})

export default HistoryScreen
