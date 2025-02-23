import React from 'react'
import {Navigate} from 'react-router-dom'
import {useAuth} from '../context/authContext'

const ProtectedRoute = ({children}) => {
  const {user, loading} = useAuth()

  // Mientras estamos verificando si el usuario está autenticado, mostramos una carga
  if (loading) {
    return <div>Loading...</div> // Puedes poner un componente de loading aquí
  }

  // Si no hay usuario autenticado, redirige a login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Si el usuario está autenticado, renderiza el contenido protegido
  return children
}

export default ProtectedRoute
