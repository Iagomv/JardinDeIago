import React from 'react'
import {useUserContext} from '../context/UserContext'
import axios from 'axios'
import {ENDPOINTS} from '../api/Endpoints'

const useShoppingActions = () => {
  const {userInfo, setUserInfo} = useUserContext()
  const gardenPurchase = async (bioma) => {
    const updatedUserInfo = {
      ...userInfo,
      jardines: [...userInfo.jardines, bioma]
    }
    const res = await axios.post(ENDPOINTS.updateUserInfo, updatedUserInfo)
    setUserInfo(updatedUserInfo)
  }

  const plantPurchase = async (gardens, garden, plant) => {
    try {
      // ✅ Find the garden index
      const gardenIndex = gardens.findIndex((g) => g.id === garden.id)
      if (gardenIndex === -1) {
        console.error('❌ Garden not found in gardens list!', gardens, garden)
        return
      }

      const updatedGardens = [...gardens]

      console.log('🟡 Checking garden:', updatedGardens[gardenIndex])

      // ✅ Access plantasJardin (which is an object, not an array)
      const plantasJardin = updatedGardens[gardenIndex].plantasJardin

      // ✅ Check if plant exists using plant.id as the key in plantasJardin
      const plantKey = plant.planta.id // Unique plant ID from the plant object
      const existingPlant = plantasJardin[plantKey]

      if (!existingPlant) {
        console.error('❌ Plant not found in plantasJardin:', plantasJardin, 'Searching for:', plant)
        return
      }

      // ✅ Update the quantity of the plant
      existingPlant.cantidad += 1

      console.log('🟢 Plant updated successfully:', existingPlant)

      // ✅ Send updated data to the server
      const response = await axios.post(ENDPOINTS.updateJardines, updatedGardens[gardenIndex])
      console.log('✅ Purchase successful:', response.data)
    } catch (error) {
      console.error('❌ Error updating jardines:', error)
    }
  }

  return {gardenPurchase, plantPurchase}
}

export default useShoppingActions
