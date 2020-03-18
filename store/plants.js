const state = () => ({
  plants: [],
  selectedPlant: null,
  plantIcons: []
})

const getters = {
  plants (state) {
    return state.plants
  },
  getPlantFromId: (state) => (id) => {
    return state.plants.find(({ _id }) => _id === id)
  },
  selectedPlant (state) {
    return state.selectedPlant
  },
  getAllPlantIcons (state) {
    return state.plantIcons
  },
  getPlantIcon: (state) => (plantName) => {
    return state.plantIcons.hasOwnProperty(plantName)
    ? state.plantIcons[plantName]
    : state.plantIcons.info
  }

}

const mutations = {
  setPlants (state, plants) {
    state.plants = plants
  },
  setSelectedPlant (state, plant) {
    state.selectedPlant = plant
  },
  setPlantIcons (state, icons) {
    state.plantIcons = icons
  }, 
}

const actions = {
  async loadPlants ({commit}) {
    const data = await this.$axios.$get('/api/flora')
    commit('setPlants', data)
  }
}

export default { state, mutations, actions, getters }