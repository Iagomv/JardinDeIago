import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useEffect, useState} from 'react'
import Navegador from './components/Navegador'
import Registro from './pages/Registro'
import {Dashboard} from './pages/Dashboard'
import Login from './pages/Login'
import {ServerProvider} from './context/serverContext'

function App() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token))
    if (token) {
      console.log(token)
    }
  }, [token])

  return (
    <ServerProvider>
      <BrowserRouter>
        <Navegador token={token} setToken={setToken} />
        <Routes>
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ServerProvider>
  )
}

export default App
