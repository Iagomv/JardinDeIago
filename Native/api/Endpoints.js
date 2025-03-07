export const API_BASE_URL = 'http://192.168.1.60:5000/api' //localhost version 'http://localhost:5000/api'
export const API_BASE_URL_HOME = 'http://192.168.0.17:5000/api'
export const SOCKET_IP_SERVERB = 'http://192.168.1.60:5000' // localhost version 'http://localhost:5000'
export const SOCKET_IP_SERVERBKARBO = 'http://192.168.1.66:5000'
export const IMAGES_API_PORT = 6243
export const dam2Running = true // Variable to utilize the correct API URL
export const ENDPOINTS = {
  registro: `${API_BASE_URL}/users/registro`,
  login: `${API_BASE_URL}/users/login`,
  updateUserInfo: `${API_BASE_URL}/users/update`,
  resetPassword: `${API_BASE_URL}/users/reset-password`,
  historico: `${API_BASE_URL}/registros/get`,
  getGardenConfig: `${API_BASE_URL}/config/`,
  getJardines: `${API_BASE_URL}/jardines/get`,
  updateJardines: `${API_BASE_URL}/jardines/update`,
  getUserByEmail: `${API_BASE_URL}/users/get/`
}
//https://api.ipify.org/?format=jsonp&callback=get_ip
