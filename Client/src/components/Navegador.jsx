import React, {useEffect} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useAuth} from '../context/authContext'
import '../styles/Navegador.css'

export const Navegador = () => {
  const {user, logout} = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.token) {
      console.log('Token actualizado:', user.token)
    }
  }, [user])

  // Función para determinar si el enlace debe estar activo
  const isActive = (path) => (location.pathname.startsWith(path) ? 'active' : '')

  const handleLogout = () => {
    logout()
    navigate('/login') // Redirige al login tras cerrar sesión
  }

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-light p-3 rounded">
        <Link className="navbar-brand text-black" to="/">
          <strong>Oasis </strong>
        </Link>
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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Links de Registro/Login */}
            {!user?.token && (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/registro')}`} to="/registro">
                    Registrarse
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/login')}`} to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
            {/* Botón de Jardines */}
            {user?.token && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-dark ms-2"
                  onClick={() => {
                    navigate('/tienda')
                  }}
                >
                  Jardines
                </button>
              </li>
            )}
            {/* Botón de Tienda */}
            {user?.token && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-dark ms-2"
                  onClick={() => {
                    navigate('/tienda')
                  }}
                >
                  Tienda
                </button>
              </li>
            )}

            {/* Botón de Logout */}
            {user?.token && (
              <li className="nav-item">
                <button className="btn btn-outline-dark ms-2" onClick={handleLogout}>
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
