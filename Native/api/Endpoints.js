export const API_BASE_URL = 'http://localhost:5000/api'
export const API_BASE_URL_HOME = 'http://192.168.0.17:5000/api'
export const SOCKET_LOCALHOST_SERVERB = 'http://localhost:5000'
export const SOCKET_IP_SERVERB = 'http://192.168.0.17:5000'
export const SOCKET_IP_SERVERBKARBO = 'http://192.168.1.66:5000'
export const rutaUsuarios = '/users'
export const ENDPOINTS = {
  registro: `${API_BASE_URL_HOME}${rutaUsuarios}/registro`,
  login: `${API_BASE_URL}${rutaUsuarios}/login`,
  resetPassword: `${API_BASE_URL}${rutaUsuarios}/reset-password`,
  historico: `${API_BASE_URL}/registros/get`
}
//https://api.ipify.org/?format=jsonp&callback=get_ip
