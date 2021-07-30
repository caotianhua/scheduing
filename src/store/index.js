import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    elements: [
    ]
  },
  mutations: {
    updateElements: (state, payload) => {
      state.elements = payload
    }
  },
  actions: {
    updateElements: ({ commit }, payload) => {
      commit("updateElements", payload)
    }
    // updateElementsAsync ({ context, step }) {
    //   setTimeout(() => {
    //     context.commit("updateElements", step)
    //   }, 1000)
    // }
  },
  modules: {
  }
})
