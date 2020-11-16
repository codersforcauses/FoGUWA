const state = () => ({
  images: []
})

const getters = {
  getImage: (state) => (id) => {
    const image = state.images.find(image => image._id === id)
    return image === undefined ? {} : image
  },

  getAllImages(state) {
    return state.images
  }
}

const mutations = {
  setImages(state, images) {
    state.images = images
  },

  addImage(state, image) {
    console.log('Add 3')
    state.images.push(image)
  },

  updateImage(state, image) {
    const index = state.images.findIndex(oldImage => oldImage._id === image._id)
    state.images[index] = image
  },

  deleteImage(state, id) {
    const index = state.images.findIndex(image => image._id === id)
    state.images.splice(index, 1)
  }
}

const actions = {
  async loadImages({commit}) {
    try {
      const images = await this.$axios.$get('/api/image')
      commit('setImages', images)
    } catch (err) {
      commit('setError', 'Failed to load images', { root: true })
    }
  },

  async createImage({ commit, dispatch }, { imageData, plantId }){
    try {
      const image = await this.$axios.$post('/api/image', imageData)
      commit('addImage', image);
      dispatch('plants/addImageToPlant', { imageId: image._id, plantId }, { root: true })
      return image
    } catch (error) {
      commit('setError', 'Failed to create image', { root: true })
    }
  },
  
  async updateImage({commit}, imageData){
    try {
      const image = await this.$axios.$patch('/api/image/' + imageData._id, imageData)
      commit('updateImage', image);
      return image
    } catch (error) {
      commit('setError', 'Failed to update image', { root: true })
    }
  },
  
  async deleteImage ({commit, dispatch}, { imageId, plantId }) {
    console.log(imageId, plantId);
    try {
      const image = await this.$axios.$delete('/api/image/' + imageId)
      commit('deleteImage', image._id)
      dispatch('plants/removeImageFromPlant', { imageId: image._id, plantId }, { root: true })
      return image
    } catch (err) {
      commit('setError', 'Failed to delete image', { root: true })
    }
  },
}


export default { state, getters, mutations, actions }
