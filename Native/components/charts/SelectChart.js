import React, {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Picker} from '@react-native-picker/picker'

const SelectChart = ({tipo, setTipo, tiposPosibles, rangoTiempo, setRangoTiempo, rangosTiempoPosibles}) => {
  // Componente para seleccionar temperatura... etc
  const renderPickerTipoDato = () => {
    return (
      <View>
        <Picker
          selectedValue={tipo} // Correcto: Usamos selectedValue en lugar de tipo directamente
          onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona una opción..." value="" />
          {tiposPosibles.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>
    )
  }

  const renderPickerRangoTiempo = () => {
    return (
      <View>
        <Picker
          selectedValue={rangoTiempo} // Aseguramos que rangoTiempo esté seleccionado correctamente
          onValueChange={(itemValue) => setRangoTiempo(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona una opción..." value="" />
          {Object.entries(rangosTiempoPosibles).map(([key, value], index) => (
            <Picker.Item key={index} label={key} value={value} />
          ))}
        </Picker>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecciona los datos a ver:</Text>
      <View style={styles.pickerRow}>
        {renderPickerTipoDato()}
        {renderPickerRangoTiempo()}
      </View>
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
  pickerRow: {
    flexDirection: 'row', // Coloca los pickers en fila
    justifyContent: 'center', // Espaciado entre los pickers
    width: '100%' // Asegura que ocupe todo el ancho
  },
  label: {
    fontSize: 18,
    marginBottom: 10
  },
  picker: {
    height: 50,
    width: 200,
    marginRight: 20
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default SelectChart
