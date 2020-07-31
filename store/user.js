const state = () => ({
  adminData: null,
})

const getters = {
  getAdmin(state){
    return state.adminData
  },
  isAdmin(state){
    return !!state.adminData
  }
}

const mutations = {
  setAdmin(state, user){
    state.adminData = user
  },
  removeAdmin(state){
    state.adminData = null
  }
}

const actions = {
  async loadAdmin({ commit }){
    try {
      const res = await this.$axios.$get('/api/userinfo')
      commit('setAdmin', res)
    } catch (error) {
      commit('setAdmin', null)
    }
  }
}

export default { state, mutations, getters, actions }
