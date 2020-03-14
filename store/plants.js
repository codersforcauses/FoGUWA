const state = () => ({
  plants: [],
  selectedPlant: null
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
  }
}

const mutations = {
  setPlants (state, plants) {
    state.plants = plants
  },
  setSelectedPlant (state, plant) {
    state.selectedPlant = plant
  }
}

const actions = {
  async loadPlants ({commit}) {
    const data = await this.$axios.$get('/api/flora')
    commit('setPlants', data)
  }
}

export default { state, mutations, actions, getters }