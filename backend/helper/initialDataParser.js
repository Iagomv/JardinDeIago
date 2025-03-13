export const initialDataParser = (data) => {
	const normalizedData = {
		humedad: (parseFloat(data.humedad) / 10).toFixed(2) || 0,
		temperatura: parseFloat(data.temperatura).toFixed(2) || 0,
		temperaturaF: parseFloat(data.temperaturaF).toFixed(2) || 0,
		calorF: parseFloat(data.calorF).toFixed(2) || 0,
		calor: (parseFloat(data.calor) - 50).toFixed(2) || 0,
		agua: (parseFloat(data.agua) - 80).toFixed(2) | 0,
		posicion: parseFloat(data.posicion).toFixed(2) || 0,
		retardo: parseFloat(data.retardo).toFixed(2) || 0,
	}
	console.log('normalizedData', normalizedData)
	return normalizedData
}
