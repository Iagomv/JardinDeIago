import { getGardenConfig } from '../DB/FireBase.js'
import { notifyUser, loggedUsers } from '../conexionCliente.js'

/**
 * Returns an array of available biomes.
 */
const getBiomas = () => ['jungla', 'desierto', 'mediterraneo', 'artico']

/**
 * Sanitizes the values in the data object to ensure they're numbers.
 * @param {Object} data - The environmental data to sanitize.
 * @returns {Object} - The sanitized data object with values as numbers.
 */
const sanitizeData = (data) => {
	return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, parseFloat(value) || 0]))
}

/**
 * Identifies which keys in the data are outside the defined min/max range for a given configuration.
 * @param {Object} data - The data to check.
 * @param {Object} range - The range configuration for a biome (should have keys like temperaturaMax, temperaturaMin, etc.).
 * @returns {Array} - A list of keys that are out of range.
 */
const keysOutOfRange = (data, range) => {
	const outOfRange = []

	Object.entries(data).forEach(([key, value]) => {
		const maxRange = range?.[`${key}Max`]
		const minRange = range?.[`${key}Min`]

		if (maxRange !== undefined && minRange !== undefined) {
			if (value > maxRange || value < minRange) {
				console.log(`Data value for "${key}" is out of range:`, value)
				outOfRange.push(key)
			} else {
				console.log(`Data value for "${key}" is within range:`, value)
			}
		}
	})

	return outOfRange
}

/**
 * Checks the common ranges for biomes the user has not configured.
 * @param {Object} data - The environmental data.
 * @param {Array} userConfiguredBiomas - The biomes the user has configured.
 * @param {Array} outOfRangeValues - Array to hold out-of-range values.
 */
const checkCommonRanges = async (data, userConfiguredBiomas, outOfRangeValues, user) => {
	const biomas = getBiomas().filter((bioma) => !userConfiguredBiomas.includes(bioma) && user.jardines.includes(bioma))

	// Retrieve configuration ranges for each selected biome and check data against them.
	const biomasRanges = await Promise.all(
		biomas.map(async (bioma) => {
			const config = await getGardenConfig(bioma)
			return { ...config, bioma }
		})
	)

	biomasRanges.forEach((biomaRange) => {
		const outOfRangeKeys = keysOutOfRange(data, biomaRange)
		if (outOfRangeKeys.length > 0) {
			outOfRangeValues.push({ bioma: biomaRange.bioma, outOfRangeKeys })
		}
	})
}

/**
 * Checks user-specific ranges and common ranges for unconfigured biomes.
 * @param {Object} data - The environmental data.
 * @param {Object} user - The user object containing garden range configurations.
 * @returns {Array} - List of out-of-range values.
 */
const checkUserRanges = async (data, user) => {
	const outOfRangeValues = []
	const userBiomas = user.gardenRangeConfig ? Object.keys(user.gardenRangeConfig) : []
	console.log('User biomas:', userBiomas)
	// Check ranges for each biome configured by the user.
	await Promise.all(
		Object.entries(user.gardenRangeConfig).map(async ([bioma, gardenRange]) => {
			const outOfRangeKeys = keysOutOfRange(data, gardenRange)
			if (outOfRangeKeys.length > 0) {
				outOfRangeValues.push({ bioma, outOfRangeKeys })
			}
		})
	)

	// Also check the common ranges for the user's unconfigured biomes.
	await checkCommonRanges(data, userBiomas, outOfRangeValues, user)

	return outOfRangeValues
}

/**
 * Checks the environmental data for all logged users and notifies them if any values are out of range.
 * @param {Object} data - The environmental data to check.
 */
export const checkLoggedUsersRanges = async (data) => {
	console.log('Checking logged users ranges...', loggedUsers)

	if (loggedUsers.length > 0) {
		for (const userObj of loggedUsers) {
			// Correctly access the loggedUser object
			const user = userObj.loggedUser

			// Ensure the user is valid before accessing its properties
			if (!user || !user.id) {
				console.log('Invalid user found, skipping...')
				continue // Skip invalid user
			}

			console.log(`Checking ranges for user: ${user.id}`) // Correctly logging the user id

			// Sanitize the data for the user
			const sanitizedData = sanitizeData(data)

			// Get out-of-range values for the user
			const outOfRangeValues = await checkUserRanges(sanitizedData, user)
			console.log(`Out-of-range values for user ${user.id}:`, outOfRangeValues)

			// Notify the user if there are any out-of-range values
			if (outOfRangeValues.length > 0) {
				notifyUser(outOfRangeValues, user)
			} else {
				console.log(`No out-of-range values for user ${user.id}.`)
			}
		}
	} else {
		console.log('No logged users to check.')
	}
}
