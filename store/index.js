const state = () => ({
  position: {
    lat: 0,
    lng: 0
  },
  search: '',
  errorSnack: false,
  errorMessage: '',
  warningSnack: false,
  warningMessage: ''
})

const getters = {
  errorSnack(state) {
    return state.errorSnack
  },
  errorMessage(state) {
    return state.errorMessage
  },
  warningSnack(state) {
    return state.errorSnack
  },
  warningMessage(state) {
    return state.errorMessage
  }
}

const mutations = {
  search(state, value) {
    state.search = value
  },
  setPosition(state, { lat, lng }) {
    state.position = {
      lat,
      lng
    }
  },
  setError(state, errorMessage) {
    state.errorSnack = true
    state.errorMessage = errorMessage
  },
  removeError(state) {
    state.errorSnack = false
  },
  setWarning(state, warningMessage) {
    state.warningSnack = true
    state.warningMessage = warningMessage
  },
  removeWarning(state) {
    state.warningSnack = false
  }
}

export default { state, mutations, getters }
