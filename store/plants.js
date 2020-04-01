const state = () => ({
  plants: [],
  selectedPlant: null,
  selectedInstance: null,
  centeredInstance: null,
  draggableInstance: null,
  plantIcons: []
})

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
    let res = null
    let targetInstance = null
    state.plants.forEach(plant => {
      res = plant.instances.find(instance => instance._id === state.selectedInstance)
      if(res) targetInstance = res
    })
    return targetInstance
  },
  getCenteredInstance (state) {
    let res = null
    let targetInstance = null
    state.plants.forEach(plant => {
      res = plant.instances.find(instance => instance._id === state.centeredInstance)
      if(res) targetInstance = res
    })
    return targetInstance
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
  setInstancePosition(state, { instance, position }){
    let res = null
    let targetInstance = null
    state.plants.forEach(plant => {
      res = plant.instances.find(candidateInstance => candidateInstance._id === instance._id)
      if (res) targetInstance = res
    })
    if(targetInstance) targetInstance.location.coordinates = position
  }
}

const actions = {
  async loadPlants ({commit}) {
    const data = await this.$axios.$get('/api/flora')
    commit('setPlants', data)
  }
}

export default { state, mutations, actions, getters }