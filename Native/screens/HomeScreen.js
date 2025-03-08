import React, {useEffect, useState} from 'react'
import {View, Text, ScrollView, Dimensions, StyleSheet} from 'react-native'
import {LineChart} from 'react-native-chart-kit'
import useServer from '../server/useServer'

const screenWidth = Dimensions.get('window').width

const HomeScreen = () => {
  const {arduinoData} = useServer()
  const [chartData, setChartData] = useState({
    humedad: {labels: [], data: []},
    temperatura: {labels: [], data: []},
    temperaturaF: {labels: [], data: []},
    calorF: {labels: [], data: []},
    calor: {labels: [], data: []},
    agua: {labels: [], data: []}
  })

  const dummyData = {
    labels: ['10:00', '10:05', '10:10'],
    data: [20, 40, 60]
  }

  useEffect(() => {
    if (arduinoData) {
      const timeLabel = new Date().toLocaleTimeString().slice(0, 5)

      const sanitizeValue = (value) => (typeof value === 'number' ? value : 0)

      setChartData((prevData) => ({
        humedad: {
          labels: [...prevData.humedad.labels, timeLabel].slice(-3),
          data: [...prevData.humedad.data, sanitizeValue(arduinoData.humedad)].slice(-3)
        },
        temperatura: {
          labels: [...prevData.temperatura.labels, timeLabel].slice(-3),
          data: [...prevData.temperatura.data, sanitizeValue(arduinoData.temperatura)].slice(-3)
        },
        temperaturaF: {
          labels: [...prevData.temperaturaF.labels, timeLabel].slice(-3),
          data: [...prevData.temperaturaF.data, sanitizeValue(arduinoData.temperaturaF)].slice(-3)
        },
        calorF: {
          labels: [...prevData.calorF.labels, timeLabel].slice(-3),
          data: [...prevData.calorF.data, sanitizeValue(arduinoData.calorF)].slice(-3)
        },
        calor: {
          labels: [...prevData.calor.labels, timeLabel].slice(-3),
          data: [...prevData.calor.data, sanitizeValue(arduinoData.calor)].slice(-3)
        },
        agua: {
          labels: [...prevData.agua.labels, timeLabel].slice(-3),
          data: [...prevData.agua.data, sanitizeValue(arduinoData.agua)].slice(-3)
        }
      }))
    }
  }, [arduinoData])

  const renderChart = (title, data, color) => {
    const safeData = data.data.some((val) => typeof val === 'number' && !isNaN(val)) ? data.data : dummyData.data

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{title}</Text>
        <LineChart
          data={{
            labels: data.labels.length ? data.labels : dummyData.labels,
            datasets: [
              {
                data: safeData,
                color: (opacity = 1) => color(opacity),
                strokeWidth: 2
              }
            ]
          }}
          width={screenWidth / 2 - 30}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#f0f0f0',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726'
            }
          }}
          bezier
        />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        {renderChart('Humedad (%)', chartData.humedad, (opacity) => `rgba(255, 99, 132, ${opacity})`)}
        {renderChart('Temperatura (°C)', chartData.temperatura, (opacity) => `rgba(54, 162, 235, ${opacity})`)}
      </View>

      <View style={styles.row}>
        {renderChart('Temperatura (°F)', chartData.temperaturaF, (opacity) => `rgba(255, 159, 64, ${opacity})`)}
        {renderChart('Calor (°F)', chartData.calorF, (opacity) => `rgba(75, 192, 192, ${opacity})`)}
      </View>
      <View style={styles.row}>
        {renderChart('Calor (°C)', chartData.calor, (opacity) => `rgba(153, 102, 255, ${opacity})`)}
        {renderChart('Agua (%)', chartData.agua, (opacity) => `rgba(255, 206, 86, ${opacity})`)}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  chartContainer: {
    width: screenWidth / 2 - 30,
    marginBottom: 20
  },
  chartTitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10
  }
})

export default HomeScreen
