export const modifyRegisterToBiomaData = (data) => {
	const { humedad, temperatura, temperaturaF, calorF, calor, agua, posicion, retardo } = data

	const humedadNum = parseFloat(humedad).toFixed(2)
	const temperaturaNum = parseFloat(temperatura).toFixed(2)
	const calorNum = parseFloat(calor).toFixed(2)
	const aguaNum = parseFloat(agua).toFixed(2)

	const jungleData = {
		humedad: (parseFloat(humedadNum) + 20).toFixed(2),
		temperatura: (parseFloat(temperaturaNum) - 10).toFixed(2),
		calor: (parseFloat(calorNum) - 10).toFixed(2),
		agua: (parseFloat(aguaNum) + 20).toFixed(2),
	}

	const desertData = {
		humedad: (parseFloat(humedadNum) - 20).toFixed(2),
		temperatura: (parseFloat(temperaturaNum) + 10).toFixed(2),
		calor: (parseFloat(calorNum) + 10).toFixed(2),
		agua: (parseFloat(aguaNum) - 20).toFixed(2),
	}

	const mediterraneanData = data

	const articData = {
		humedad: (parseFloat(humedadNum) + 10).toFixed(2),
		temperatura: (parseFloat(temperaturaNum) - 20).toFixed(2),
		calor: (parseFloat(calorNum) - 20).toFixed(2),
		agua: (parseFloat(aguaNum) + 10).toFixed(2),
	}

	return { ...data, artico: articData, mediterraneo: mediterraneanData, jungla: jungleData, desierto: desertData }
}
