const state = () => ({
  position: {
    lat: 0,
    lng: 0
  },
  plantFocus: 0
})

const mutations = {
  setPosition(state, { lat, lng }) {
    state.position = {
      lat,
      lng
    }
  },
  setFocusPlant(state, id) {
    state.plantFocus = id
  }
}

export default { state, mutations }
