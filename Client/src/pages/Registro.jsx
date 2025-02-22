import React from 'react'
import {useState} from 'react'
import Axios from 'axios'
import {authRegisterError} from '../error/authError'
import {useNavigate} from 'react-router'
import endpoints from '../API/endpoints.js'

export const Registro = () => {
  const navigate = useNavigate()
  const [nuevoUsuario, setNuevoUsuario] = useState({
    email: '',
    password: ''
  })

  //Handler para registrar a un nuevo usuario tras comprobar formato y existencia de email
  const handleRegistro = async (e) => {
    e.preventDefault()
    // Datos del nuevo usuario
    const nuevoUsuario = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    }
    try {
      // Enviar los datos al servidor
      const res = await Axios.post(endpoints.registro, nuevoUsuario)
      alert(`${res.data.message}`)
      if (res.status === 200) navigate('/login')
    } catch (error) {
      authRegisterError(error)
    }
  }

  return (
    <div className="container w-25 bg-white rounded shadow-sm p-4" id="FormularioRegistro ">
      <h2>Formulario de registro</h2>
      <form className="d-flex-row align-items-center justify-content-center mb-3">
        <input className="form-control mt-3" type="email" name="email" id="email" placeholder="email@email.com" />
        <input className="form-control mt-3" type="password" name="password" id="password" placeholder="contraseña" />
        <button className="btn btn-outline-secondary mt-3" onClick={handleRegistro}>
          Registrarse
        </button>
      </form>
    </div>
  )
}

export default Registro
