import React, {useEffect, useState} from 'react'
import {View, Text, ScrollView, Dimensions, StyleSheet} from 'react-native'
import {LineChart} from 'react-native-chart-kit'

const SingleChart = ({data, tipo, rangoTiempo}) => {
  const [chartData, setChartData] = useState({labels: [], datasets: [{data: []}]})
  //TODO PORQUE 10 20 30?
  const timedDataParser = () => {
    const actualTime = new Date().toLocaleTimeString().slice(0, 5).replace(':', '') // Hora actual sin los :
    const actualTimeInMinutes = parseInt(actualTime, 10) // Convertimos a número para hacer comparaciones
    console.log(actualTimeInMinutes)
    // Filtrar según el rango de tiempo seleccionado
    let filteredData = []
    console.log(rangoTiempo)
    console.log(rangoTiempo + 1 - 1)

    switch (rangoTiempo + 1 - 1) {
      case 0: // Últimos 15 minutos
        filteredData = data.filter((item) => parseInt(item.id, 10) > actualTimeInMinutes - 15)
        console.log('case0')

        break
      case 10: // Última hora
        console.log('case1')
        filteredData = data.filter((item) => parseInt(item.id, 10) > actualTimeInMinutes - 60)

        break
      case 20: // Últimas 6 horas
        filteredData = data.filter((item) => parseInt(item.id, 10) > actualTimeInMinutes - 360)
        console.log('case2')

        break
      case 30: // Todo el día
        filteredData = data // Suponiendo que todo el dataset es relevante para el "día".
        break
    }

    return filteredData
  }

  // Usamos useEffect para actualizar el gráfico cuando los datos cambian
  useEffect(() => {
    const timeRangeData = timedDataParser() // Obtener los datos filtrados según el rango de tiempo seleccionado.
    if (timeRangeData && tipo) {
      const labels = timeRangeData.map((item) => item.id.toString()) // Convertimos `id` a string para que labels funcionen
      const datasetData = timeRangeData.map((item) => item[tipo])

      // Actualizamos el chartData con los datos filtrados
      setChartData({
        labels,
        datasets: [{data: datasetData}]
      })
    }
  }, [data, tipo, rangoTiempo]) // Se recalcula cada vez que cambia `data`, `tipo` o `rangoTiempo`

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <Text style={styles.title}>Gráfico de {tipo}</Text>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 20} // Se ajusta al ancho de la pantalla
          height={250}
          yAxisLabel=""
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {borderRadius: 10},
            propsForDots: {r: '5', strokeWidth: '2', stroke: '#0000ff'}
          }}
          style={styles.chart}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {padding: 10, alignItems: 'center'},
  title: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  chart: {borderRadius: 10}
})

export default SingleChart
