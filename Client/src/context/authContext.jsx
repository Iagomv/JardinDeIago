import React, {createContext, useState, useContext, useEffect} from 'react'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // Para manejar el estado de carga

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({token})
    }
    setLoading(false) // Una vez verificado el token, deja de cargar
  }, [])

  const login = (token) => {
    setUser({token})
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  return <AuthContext.Provider value={{user, login, logout, loading}}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
