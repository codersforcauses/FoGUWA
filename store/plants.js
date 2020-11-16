const state = () => ({
  plants: [],
  tempPlant: null,
  selectedPlant: null,
  selectedInstance: null,
  centeredInstance: null,
  draggableInstance: null,
  plantIcons: [],
  updateMap: false,
})

const getters = {
  getPlants (state) {
    return state.plants
  },

  getPlantFromId: (state) => (id) => {
    return state.plants.find(({ _id }) => _id === id)
  },

  getSelectedPlant (state) {
    return state.selectedPlant
  },

  getSelectedInstance (state) {
    return state.selectedInstance
  },

  getCenteredInstance (state) {
    return state.centeredInstance
  },

  getDraggableInstance (state) {
    return state.draggableInstance
  },

  getAllPlantIcons (state) {
    return state.plantIcons
  },

  getPlantIcon: (state) => (plantName) => {
    return state.plantIcons.hasOwnProperty(plantName)
    ? state.plantIcons[plantName]
    : state.plantIcons.info
  },

  updateMap(state) {
    return state.updateMap
  }
}

const mutations = {
  setPlants (state, plants) {
    state.plants = plants
  },

  // Plant Core Mutations
  addPlant(state, plant){
    state.plants.push(plant);
  },

  updatePlant(state, updatedPlant){
    const plantIndex = state.plants.findIndex(plant => plant._id === updatedPlant._id)
    state.plants[plantIndex] = updatedPlant
  },

  addImage(state, {imageId, plantId}){
    const plantIndex = state.plants.findIndex(plant => plant._id === plantId)
    state.plants[plantIndex].images.push(imageId)
  },

  removeImage(state, {imageId, plantId}){
    const plant = state.plants.find(plant => plant._id === plantId)
    const imageIndex = plant.images.findIndex(id => id === imageId)
    plant.images.splice(imageIndex, 1)
  },

  deletePlant(state, plantId) {
    const plantIndex = state.plants.findIndex(plant => plant._id === plantId)
    state.plants.splice(plantIndex, 1)
  },

  setTempPlant (state, plant){
    state.tempPlant = JSON.parse(JSON.stringify(plant))
  },

  revertTempPlant (state) {
    const plantIndex = state.plants.findIndex(plant => plant._id === state.tempPlant._id)
    state.plants[plantIndex] = state.tempPlant
    state.tempPlant = null
  },

  setSelectedPlant (state, plantId) {
    if (!plantId) state.selectedPlant = null
    else state.selectedPlant = state.plants.find((plant) => plant._id === plantId)
  },

  // Instance Selections
  setSelectedInstance (state, instanceId) {
    if (!instanceId) state.selectedInstance = null
    else {
      const plant = state.selectedPlant
      state.selectedInstance = plant.instances.find((instance) => instance._id === instanceId)
    }
  },

  setCenteredInstance (state, instanceId) {
    if (!instanceId) state.centeredInstance = null
    else {
      const plant = state.selectedPlant
      state.centeredInstance = plant.instances.find((instance) => instance._id === instanceId)
    }
  },

  setDraggableInstance (state, instanceId) {
    if (!instanceId) state.draggableInstance = null
    else {
      const plant = state.selectedPlant
      state.draggableInstance = plant.instances.find((instance) => instance._id === instanceId)
    }
  },

  setSelectedInstancePosition(state, position) {
    const instance = state.selectedInstance
    if(instance) instance.location.coordinates = position
  },

  setPlantIcons (state, icons) {
    state.plantIcons = icons
  },
  
  mapUpdateNeeded(state, needsUpdate) {
    state.updateMap = needsUpdate
  },
}

const actions = {
  async loadPlants ({commit}) {
    try {
      const plants = await this.$axios.$get('/api/flora')
      commit('setPlants', plants)
    } catch (err) {
      commit('setError', 'Failed to load plants', { root: true })
    }
  },

  // Plant Core Actions
  async createPlant({commit}, plantData){
    try {
      const plant = await this.$axios.$post('/api/flora', plantData)
      commit('addPlant', plant);
      return plant
    } catch (error) {
      commit('setError', 'Failed to create plant', { root: true })
    }
  },

  async updatePlant({commit}, plantData){
    try {
      const plant = await this.$axios.$patch('/api/flora/' + plantData._id, plantData)
      commit('updatePlant', plant);
      return plant._id
    } catch (error) {
      commit('setError', 'Failed to update plant', { root: true })
    }
  },
  
  async deletePlant ({commit}, plantId) {
    try {
      const plant = await this.$axios.$delete('/api/flora/' + plantId)
      commit('deletePlant', plant._id)
      commit('setSelectedPlant', null)
      commit('setSelectedInstance', null)
      commit('setCenteredInstance', null)
      commit('mapUpdateNeeded', true)
      return plant._id
    } catch (err) {
      commit('setError', 'Failed to delete plant', { root: true })
    }
  },

  addImageToPlant({ getters, commit, dispatch }, {imageId, plantId}){
    try {
      commit('addImage', { imageId, plantId })
      const plantData = getters.getPlantFromId(plantId)
      this.$axios.$patch('/api/flora/' + plantData._id, plantData)
    } catch (error) {
      commit('setError', 'Failed to add image to plant', { root: true })
    }
  },
  
  removeImageFromPlant({ getters, commit, dispatch }, {imageId, plantId}){
    try {
      commit('removeImage', { imageId, plantId })
      const plantData = getters.getPlantFromId(plantId)
      this.$axios.$patch('/api/flora/' + plantData._id, plantData)
    } catch (error) {
      commit('setError', 'Failed to remove image from plant', { root: true })
    }
  },
  
  // Instance Core Actions
  async createInstance({ commit, getters }, plantId) {
    try {
      const updatePlant = getters.getSelectedPlant
      const arrayCopy = [...updatePlant.instances]
      arrayCopy.push({
        location: {
          coordinates: [
            -31.976764, 115.818220
          ],
          type: 'Point'
        }})
      const plant = await this.$axios.$patch('/api/flora/' + plantId, {
        ...updatePlant,
        instances: arrayCopy
      })
        const newInstance = plant.instances.find((instance) => {
          return !getters.getPlantFromId(plantId).instances.some((oldInstance) => instance._id === oldInstance._id)
        })
        commit('updatePlant', plant)
        commit('setSelectedPlant', plant._id)
        commit('setSelectedInstance', newInstance._id)
        commit('setCenteredInstance', newInstance._id)
        commit('mapUpdateNeeded', true)
    } catch (err) {
      commit('setError', 'Failed to add plant instance', { root: true })
    }
  },

  async updateInstance({ commit, getters }, updateInstance){
    try {
      const updatePlant = getters.getSelectedPlant
      const instanceIndex = updatePlant.instances.findIndex((instance) => instance._id === updateInstance._id)
      const arrayCopy = [...updatePlant.instances]
      arrayCopy[instanceIndex] = updateInstance
      const plant = await this.$axios.$patch('/api/flora/' + updatePlant._id, {...updatePlant, instances: arrayCopy})
      commit('updatePlant', plant)
      commit('setSelectedPlant', plant._id)
      commit('mapUpdateNeeded', true)
    } catch (err) {
      commit('setError', 'Failed to update plant instance', { root: true })
    }
  },

  async deleteInstance ({ commit, getters }, instanceId) {
    try {
      const updatePlant = getters.getSelectedPlant
      const instanceIndex = updatePlant.instances.findIndex((instance) => instance._id === instanceId)
      const arrayCopy = [...updatePlant.instances]
      arrayCopy.splice(instanceIndex, 1)
      const plant = await this.$axios.$patch('/api/flora/' + updatePlant._id, {...updatePlant, instances: arrayCopy})
      commit('updatePlant', plant)
      commit('setSelectedInstance', null)
      commit('setCenteredInstance', null)
      commit('setSelectedPlant', plant._id)
      commit('mapUpdateNeeded', true)
    } catch (err) {
      commit('setError', 'Failed to delete plant instance', { root: true })
    }
  },
}

export default { state, mutations, actions, getters }