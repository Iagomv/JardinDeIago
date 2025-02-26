import {Alert} from 'react-native'

// Funciones para manejar los errores de autenticación
export const authRegisterError = (error) => {
  if (error.response) {
    const errorCode = error.response.data.error

    switch (errorCode) {
      case 'auth/email-already-in-use':
        Alert.alert('❌ El email ya está en uso.')
        break
      case 'auth/invalid-email':
        Alert.alert('❌ El email no tiene un formato válido.')
        break
      case 'auth/weak-password':
        Alert.alert('❌ La contraseña debe tener al menos 6 caracteres.')
        break
      default:
        Alert.alert(`❌ Algo ha salido mal: ${errorCode}`)
        console.error(errorCode)
        break
    }
  } else {
    Alert.alert('❌ Error desconocido al registrar el usuario.')
    console.error(error)
  }
}

export const authLoginError = (error) => {
  if (error.response) {
    const errorCode = error.response.data.error

    switch (errorCode) {
      case 'auth/invalid-email':
        Alert.alert('❌ El email no es válido.')
        break
      case 'auth/user-disabled':
        Alert.alert('❌ La cuenta ha sido deshabilitada.')
        break
      case 'auth/user-not-found':
        Alert.alert('❌ No se ha encontrado el usuario.')
        break
      case 'auth/wrong-password':
        Alert.alert('❌ Contraseña incorrecta.')
        break
      case 'auth/too-many-requests':
        Alert.alert('❌ Se ha superado el límite de intentos.')
        break
      default:
        Alert.alert(`❌ Algo ha salido mal: ${errorCode}`)
        console.error(errorCode)
        break
    }
  } else {
    Alert.alert('❌ Error desconocido al registrar el usuario.')
    console.error(error)
  }
}
