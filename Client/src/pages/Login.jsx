import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router'
import axios from 'axios'
import endpoints from '../API/endpoints.js'
import {authLoginError} from '../error/authError'
import {useAuth} from '../context/authContext'

const Login = () => {
  // Estado para almacenar la información de inicio de sesión
  const navigate = useNavigate()
  const {login} = useAuth() // Extrae la función 'login' del contexto
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const handleCambioInfo = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(endpoints.login, loginInfo)
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token) // Guardar el token
        login(response.data.token)
        navigate('/')
      }
    } catch (error) {
      authLoginError(error)
    }
  }
  return (
    <div className="container w-25 bg-white rounded shadow-sm">
      <form className="form p-3 d-flex flex-column gap-3 ">
        <h2>Inicio de sesión</h2>
        <div className="container ">
          <div className="form-group">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              id="inputEmail"
              type="email"
              className="form-control"
              name="email"
              placeholder="iago@email.com"
              onChange={(e) => handleCambioInfo(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              id="inputPassword"
              type="password"
              className="form-control"
              name="password"
              placeholder="Password123"
              onChange={(e) => handleCambioInfo(e)}
            />
          </div>
          <button className="btn btn-outline-secondary mt-3 col-6" onClick={(e) => handleLogin(e)}>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
