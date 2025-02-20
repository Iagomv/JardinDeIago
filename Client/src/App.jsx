import {useState, useEffect} from 'react'
import useSocket from './hooks/useServer'
import './App.css'

function App() {
  const {arduinoData, sendArduino} = useServer() // Get the latest arduino data
  const [displayData, setDisplayData] = useState(null)

  useEffect(() => {
    if (arduinoData) {
      setDisplayData(arduinoData)
    }
  }, [arduinoData]) // Runs whenever arduinoData changes

  return (
    <div>
      <h1>Datos del Arduino</h1>
      <pre>{JSON.stringify(displayData, null, 2)}</pre> {/* Display received data */}
    </div>
  )
}

export default App
