import React, {useState} from 'react'
import {View, Text, Picker, FlatList, StyleSheet} from 'react-native'

const HistoricalTable = ({data}) => {
  const [selectedParam, setSelectedParam] = useState()

  const availableParams = Object.keys(data[0] || {}).filter((key) => key !== 'id')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos Históricos</Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Selecciona un parámetro:</Text>
        <Picker
          selectedValue={selectedParam}
          onValueChange={(itemValue) => setSelectedParam(itemValue)}
          style={styles.picker}
        >
          {availableParams.map((param) => (
            <Picker.Item key={param} label={param} value={param} />
          ))}
        </Picker>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Hora</Text>
        <Text style={styles.headerText}>{selectedParam || 'Seleccionar parámetro'}</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item, index}) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{index}:00</Text>
            <Text style={styles.cell}>{item[selectedParam]}</Text>
          </View>
        )}
        style={styles.tableContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4
  },
  tableContainer: {
    maxHeight: 400
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  },
  pickerContainer: {
    marginBottom: 12
  },
  label: {
    marginBottom: 4,
    fontSize: 14
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 8,
    marginBottom: 8
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14
  }
})

export default HistoricalTable
