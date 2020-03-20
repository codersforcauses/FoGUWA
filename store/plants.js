const state = () => ({
  plants: [],
  instanceMarkers: [],
  selectedPlant: null,
  selectedInstance: null,
  centeredInstance: null,
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
    return state.selectedPlant
  },
  getSelectedInstance (state) {
    return state.selectedInstance
  },
  getCenteredInstance (state) {
    return state.centeredInstance
  },
  getAllPlantIcons (state) {
    return state.plantIcons
  },
  getPlantIcon: (state) => (plantName) => {
    return state.plantIcons.hasOwnProperty(plantName)
    ? state.plantIcons[plantName]
    : state.plantIcons.info
  },
  getMarker: (state) => instanceId => {
    return state.instanceMarkers.find(instance => instance.id === instanceId)
  }
}

const mutations = {
  setPlants (state, plants) {
    state.plants = plants
  },
  setSelectedPlant (state, plant) {
    state.selectedPlant = plant
  },
  setSelectedInstance (state, instance) {
    state.selectedInstance = instance
  },
  setCenteredInstance (state, instance) {
    state.centeredInstance = instance
    state.selectedInstance = instance
  },
  setCenteredNull (state) {
    state.centeredInstance = null
  },
  setPlantIcons (state, icons) {
    state.plantIcons = icons
  },
  setInstanceMarker (state, { instance, marker }) {
    state.instanceMarkers.push({ id: instance._id, draggable: marker.setDraggable })
  }
}

const actions = {
  async loadPlants ({commit}) {
    const data = await this.$axios.$get('/api/flora')
    commit('setPlants', data)
  }
}

export default { state, mutations, actions, getters }