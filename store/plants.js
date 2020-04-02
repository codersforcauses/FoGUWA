const state = () => ({
  plants: [],
  selectedPlant: null,
  selectedInstance: null,
  centeredInstance: null,
  draggableInstance: null,
  plantIcons: []
})

const getInstance = (state, instanceId) => {
  let res = null
  let targetInstance = null
  state.plants.forEach(plant => {
    res = plant.instances.find(instance => instance._id === instanceId)
    if(res) targetInstance = res
  })
  return targetInstance
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
    return getInstance(state, state.selectedInstance)
  },
  getCenteredInstance (state) {
    return getInstance(state, state.centeredInstance)
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
  }
}

const mutations = {
  setPlants (state, plants) {
    state.plants = plants
  },
  setSelectedPlant (state, plant) {
    state.selectedPlant = plant._id
  },
  setSelectedInstance (state, instance) {
    state.selectedInstance = instance._id
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
  }
}

const actions = {
  async loadPlants ({commit}) {
    const data = await this.$axios.$get('/api/flora')
    commit('setPlants', data)
  },
  async deletePlant ({commit}, plantId) {
    const result = await this.$axios.$delete('/api/flora/' + plantId)
    if(result.status) commit('deletePlant', plantId) // DOTH NOT WORK find out what result looks like
  }
}

export default { state, mutations, actions, getters }