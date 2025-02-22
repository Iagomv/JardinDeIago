import {createContext, useContext, useState} from 'react'
import useServer from '../hooks/useServer'

// Crear el contexto
const ServerContext = createContext()

// Hook personalizado para acceder al contexto
export const useServerContext = () => useContext(ServerContext)

// Proveedor del contexto
export const ServerProvider = ({children}) => {
  // Estados a compartir
  const {arduinoData, sendArduino, setConfiguracionInicial, setNuevaConfiguracion} = useServer()

  //Envolvemos todos los children dentro del proveedor y pasamos los estados
  return (
    <ServerContext.Provider
      value={{
        arduinoData,
        sendArduino,
        setConfiguracionInicial,
        setNuevaConfiguracion
      }}
    >
      {children}
    </ServerContext.Provider>
  )
}
