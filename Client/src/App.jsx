import {useState, useEffect} from 'react'
import useServer from './hooks/useServer'
import './App.css'

function App() {
  const {arduinoData, setConfiguracionInicial, setNuevaConfiguracion} = useServer()

  useEffect(() => {}, [arduinoData])
  let jsonToArduino = {
    pinSensorAgua: 1,
    pinServo: 30,
    pinFC28: '0',
    pinDht: 52,
    posicionServo: 140,
    retardo: 5
  }
  return (
    <div>
      <h1>{JSON.stringify(arduinoData)}</h1>
      <button onClick={() => setNuevaConfiguracion(jsonToArduino)}>Nueva Configuracion</button>{' '}
      <button onClick={() => setConfiguracionInicial()}>Configuracion Inicial</button>
    </div>
  )
}

export default App
