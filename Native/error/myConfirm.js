import React from 'react'
import {Platform, Alert} from 'react-native'

// Componente para manejar las confirmaciones (aceptar/cancelar)
export const myConfirm = (message, onConfirm, onCancel) => {
  if (Platform.OS === 'web') {
    // Si estamos en la web, utilizamos window.confirm
    const isConfirmed = window.confirm(message)
    if (isConfirmed) {
      onConfirm()
    } else {
      onCancel()
    }
  } else {
    // Si estamos en una aplicación móvil, usamos Alert.alert
    Alert.alert(
      'Confirmación',
      message,
      [
        {
          text: 'Cancelar',
          onPress: onCancel,
          style: 'cancel'
        },
        {
          text: 'Aceptar',
          onPress: onConfirm
        }
      ],
      {cancelable: true}
    )
  }
}
