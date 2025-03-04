// Función para obtener la fecha en formato DDMMYYYY
export const obtenerFechaActual = () => {
  const fecha = new Date()
  const dia = String(fecha.getDate()).padStart(2, '0')
  const mes = String(fecha.getMonth() + 1).padStart(2, '0') // Mes comienza en 0
  const año = fecha.getFullYear()
  return `${dia}${mes}${año}`
}

export const obtenerHoraMinutoActual = () => {
  const fecha = new Date()
  const momento = String(fecha.getHours()).padStart(2, '0') + String(fecha.getMinutes()).padStart(2, '0')
  return momento
}
