import React, {useState} from 'react'
import {View, Text, Button, Platform} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const DatePickerExample = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    setSelectedDate(date)
    hideDatePicker()
  }

  // En la web, usar un DatePicker nativo de HTML
  const renderWebDatePicker = () => {
    return (
      <input
        type="date"
        value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
        onChange={(e) => setSelectedDate(new Date(e.target.value))}
        style={{marginTop: 20}}
      />
    )
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Seleccionar Fecha" onPress={showDatePicker} />
      {selectedDate && <Text style={{marginTop: 20}}>Fecha seleccionada: {selectedDate.toLocaleDateString()}</Text>}

      {/* Mostrar el DatePicker modal solo en plataformas nativas */}
      {Platform.OS !== 'web' && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={selectedDate || new Date()}
          minimumDate={new Date()}
          locale="es"
        />
      )}

      {/* Mostrar DatePicker en la web como un campo de entrada de fecha */}
      {Platform.OS === 'web' && renderWebDatePicker()}
    </View>
  )
}

export default DatePickerExample
