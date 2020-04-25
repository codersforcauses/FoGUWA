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

const getInstance = (plants, instanceId) => {
  for (const plant of plants) {
    for (const instance of plant.instances) {
      if (instance._id === instanceId) return instance
    }
  }
}
const getPlantFromInstance = (plants, instanceId) => {
  for (const plant of plants) {
    for (const instance of plant.instances) {
      if (instance._id === instanceId) return plant
    }
  }
}

const getters = {
  plants (state) {
    return state.plants
  },
  getPlantFromId: (state) => (id) => {
    return state.plants.find(({ _id }) => _id === id)
  },
  getSelectedPlant (state) {
    return state.plants.find(plant => plant._id === state.selectedPlant)
  },
  getSelectedInstance (state) {
    return getInstance(state.plants, state.selectedInstance)
  },
  getCenteredInstance (state) {
    return getInstance(state.plants, state.centeredInstance)
  },
  getAllPlantIcons (state) {
    return state.plantIcons
  },
  getPlantIcon: (state) => (plantName) => {
    return state.plantIcons.hasOwnProperty(plantName)
    ? state.plantIcons[plantName]
    : state.plantIcons.info
  },
  getDraggable (state) {
    return state.draggableInstance
  },
  updateMap(state) {
    return state.updateMap
  }
}

const mutations = {
  setPlants (state, plants) {
    state.plants = plants
  },
  setPlant (state, plant) {
    const plantIndex = state.plants.findIndex(targetPlant => targetPlant._id === plant.Id)
    state.plants[plantIndex] = plant
  },
  setTempPlant (state, plant){
    state.tempPlant = JSON.parse(JSON.stringify(plant))
  },
  revertTempPlant (state) {
    const plantIndex = state.plants.findIndex(plant => plant._id === state.tempPlant._id)
    state.plants[plantIndex] = state.tempPlant
    state.tempPlant = null
  },
  setSelectedPlant (state, plant) {
    state.selectedPlant = plant._id
  },
  setSelectedPlantNull (state) {
    state.selectedPlant = null
  },
  setSelectedInstance (state, instance) {
    state.selectedInstance = instance._id
  },
  setSelectedInstanceNull (state) {
    state.selectedInstance = null
  },
  setCenteredInstance (state, instance) {
    state.centeredInstance = instance._id
    state.selectedInstance = instance._id
  },
  setCenteredNull (state) {
    state.centeredInstance = null
  },
  setPlantIcons (state, icons) {
    state.plantIcons = icons
  },
  setDraggable (state, instanceId) {
    state.draggableInstance = instanceId
  },
  setInstancePosition(state, { instance, position }) {
    const targetInstance = getInstance(state, instance._id)
    if(targetInstance) targetInstance.location.coordinates = position
  },
  deletePlant(state, plantId) {
    const plantIndex = state.plants.findIndex(plant => plant._id === plantId)
    state.plants.splice(plantIndex, 1)
  },
  deleteInstance(state, { plantId, instanceId }) {
    const plant = state.plants.find(plant => plant._id === plantId)
    const instanceIndex = plant.instances.findIndex(instance => instance._id === instanceId)
    plant.instances.splice(instanceIndex, 1)
  },
  updateMap(state) {
    state.updateMap = true
  },
  mapUpdated(state) {
    state.updateMap = false
  },
  addPlant(state,plant){
    state.plants.append(plant);
  }
}

const actions = {
  async loadPlants ({commit}) {
    const data = await this.$axios.$get('/api/flora')
    commit('setPlants', data)
  },
  deleteInstance ({ commit, getters }, instanceId) {
    const { plants } = getters
    const plant = getPlantFromInstance(plants, instanceId)
    commit('setTempPlant', plant)
    commit('deleteInstance', { plantId: plant._id, instanceId })
    this.$axios.patch('/api/flora/' + plant._id, plant).then(() => {
      commit('setTempPlant', null)
    }).catch(err => {
      console.log(err);
      commit('revertTempPlant')
    })
    commit('updateMap')
  },
  deletePlant ({commit}, plantId) {
    this.$axios.delete('/api/flora/' + plantId).then((res) => {
      commit('deletePlant', plantId)
      commit('setCenteredNull')
      commit('setSelectedPlantNull')
      commit('setSelectedInstanceNull')
      commit('updateMap')
    }).catch((err) => {
      commit('setError', err, { root: true })
    })
  },
  createPlant({commit},plant){
    this.$axios.post('/api/flora',plant).then((res)=>{
      commit('addPlant',res);
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  }
}

export default { state, mutations, actions, getters }