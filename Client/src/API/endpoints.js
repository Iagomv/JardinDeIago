const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
// Definir las rutas relativas
const ENDPOINTS = {
  registro: `${API_BASE_URL}/users/registro`,
  login: `${API_BASE_URL}/users/login`,
  usuarios: `${API_BASE_URL}/users`
}

export default ENDPOINTS
