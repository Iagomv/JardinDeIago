export const API_BASE_URL = 'http://localhost:5000/api'
export const API_BASE_URL_HOME = 'http://192.168.0.17:5000/api'
export const SOCKET_LOCALHOST_SERVERB = 'http://localhost:5000'
export const SOCKET_IP_SERVERB = 'http://192.168.0.17:5000'
export const SOCKET_IP_SERVERBKARBO = 'http://192.168.1.66:5000'
export const IMAGES_API_PORT = 6243
export const dam2Running = true
export const rutaUsuarios = '/users'
export const ENDPOINTS = {
  registro: `${API_BASE_URL}${rutaUsuarios}/registro`,
  login: `${API_BASE_URL}${rutaUsuarios}/login`,
  updateUserInfo: `${API_BASE_URL}/users/update`,
  resetPassword: `${API_BASE_URL}${rutaUsuarios}/reset-password`,
  historico: `${API_BASE_URL}/registros/get`,
  getJardines: `${API_BASE_URL}/jardines/get`,
  updateJardines: `${API_BASE_URL}/jardines/update`,
  getUserByEmail: `${API_BASE_URL}${rutaUsuarios}/get/`
}
//https://api.ipify.org/?format=jsonp&callback=get_ip
