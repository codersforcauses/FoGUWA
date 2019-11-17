const state = () => ({
  position: {
    lat: 0,
    lng: 0
  },
  search: ''
})

const mutations = {
  search(state, value) {
    state.search = value
  },
  setPosition(state, { lat, lng }) {
    state.position = {
      lat,
      lng
    }
  }
}

export default { state, mutations }
