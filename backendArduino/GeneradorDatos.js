export const generarDatos = () => {
  return {
    dato1: parseFloat((Math.random() * (95 - 60) + 60).toFixed(2)), // Entre 60% y 95%
    dato2: parseFloat((Math.random() * (25 - 5) + 5).toFixed(2)), // Entre 5°C y 25°C
    dato3: parseFloat(((Math.random() * (25 - 5) + 5) * 1.8 + 32).toFixed(2)), // Conversión a Fahrenheit
    dato4: parseFloat(((Math.random() * (25 - 5) + 5) * 1.8 + 32 + Math.random() * 3).toFixed(2)), // Sensación térmica en F
    dato5: parseFloat((Math.random() * (30 - 10) + 10).toFixed(2)), // Sensación térmica en °C (relacionada con humedad)
    dato6: parseFloat((Math.random() * (80 - 20) + 20).toFixed(2)), // Nivel de agua entre 20 y 80%
    dato7: parseFloat((Math.random() * (95 - 60) + 60).toFixed(2)), // Entre 60% y 95%
    dato8: parseFloat((Math.random() * 90).toFixed(2)),
    dato9: parseFloat((Math.random() * 10).toFixed(2))
  }
}
