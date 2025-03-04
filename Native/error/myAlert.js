import {Platform, Alert} from 'react-native'

// Función que maneja las alertas en función del entorno (web o móvil)
export const myAlert = (type, message) => {
  // Verificar si estamos en la web o en una app móvil
  if (Platform.OS === 'web') {
    // Si estamos en la web, usamos el alert estándar de JS
    alert(message)
  } else {
    // Si estamos en una app móvil (React Native), usamos Alert.alert
    switch (type) {
      case 'success':
        Alert.alert('Éxito', message, [{text: 'OK'}])
        break
      case 'error':
        Alert.alert('Error', message, [{text: 'OK'}])
        break
      default:
        Alert.alert('Información', message, [{text: 'OK'}])
    }
  }
}
