import React, {useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import '../styles/Navegador.css'

export const Navegador = ({token, setToken}) => {
  const location = useLocation() // hook para obtener la ubicación actual

  useEffect(() => {
    if (token) {
      console.log('Token updated:', token)
    }
  }, [token])

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    console.log('User logged out.')
  }

  // Función para determinar si el enlace debe estar activo
  const isActive = (path) => (location.pathname.startsWith(path) ? 'active' : '')
  //TODO Cambiar IagoMV para link jugar
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-white py-3">
        {/* IagoMV */}
        <Link className="navbar-brand" to="/">
          <strong>Kahoot Iago MV</strong>
        </Link>
        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Admin Link */}
            {/* {token?.tipo === 'admin' && (
              <li className="nav-item">
                <Link className={`nav-link minimalist ${isActive('/usuarios')}`} to="/usuarios">
                  Usuarios
                </Link>
              </li>
            )} */}
            {/* Cuestionarios Link */}
            {/* <li className="nav-item">
              <Link className={`nav-link minimalist ${isActive('/cuestionarios')}`} to="/cuestionarios">
                Cuestionarios
              </Link>
            </li> */}
            {/* Crear Cuestionario Link */}
            {/* {token && (
              <li className="nav-item">
                <Link className={`nav-link minimalist ${isActive('/crearCuestionario')}`} to="/crearCuestionario">
                  Crear cuestionario
                </Link>
              </li>
            )} */}
            {/* Registration/Login Links */}
            {!token && (
              <>
                <li className="nav-item">
                  <Link className={`nav-link minimalist ${isActive('/registro')}`} to="/registro">
                    Registrarse
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link minimalist ${isActive('/login')}`} to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
            {/* Logout Button */}
            {token && (
              <li className="nav-item">
                <button
                  className="btn btn-link minimalist text-white"
                  style={{textDecoration: 'none'}}
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navegador
