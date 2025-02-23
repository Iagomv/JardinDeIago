import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import {useEffect, useState} from 'react'
import Navegador from './components/Navegador'
import Registro from './pages/Registro'
import {Dashboard} from './pages/Dashboard'
import Login from './pages/Login'
import {ServerProvider} from './context/serverContext'
import {AuthProvider} from './context/authContext'
import {ThemeProvider} from './context/themeProvider'
import ProtectedRoute from './components/ProtectedRoute'
import {Tienda} from './pages/Tienda'
import './styles/themes.css'

function App() {
  return (
    <ServerProvider>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Navegador />
            <Routes>
              <Route path="/registro" element={<Registro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/tienda"
                element={
                  <ProtectedRoute>
                    <Tienda />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </ServerProvider>
  )
}

export default App
