// src/context/UserContext.js
import React, {createContext, useState, useContext, useEffect} from 'react'

// Crear el contexto
const UserContext = createContext()

// Crear el proveedor del contexto
export const UserProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Estado de login
  const [userInfo, setUserInfo] = useState(null) // Información del usuario

  // Función para actualizar el estado del login y la información del usuario
  const login = (userData) => {
    console.log('✅ Logging in user:', userData)
    setUserInfo(userData) // Guardamos la info del usuario
    setIsLoggedIn(true)
  }

  const logout = () => {
    console.log('logout')
    setIsLoggedIn(false)
    setUserInfo(null) // Limpiamos la información del usuario al cerrar sesión
  }

  return (
    <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, setUserInfo, userInfo, login, logout}}>
      {children}
    </UserContext.Provider>
  )
}

// Hook para usar el contexto en otros componentes
export const useUserContext = () => {
  return useContext(UserContext)
}
