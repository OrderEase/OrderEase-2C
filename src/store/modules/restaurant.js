import {Restaurant} from '@/api/api.js'
import Vue from 'vue'

const state = {
  restaurant: {}
}

const getters = {

}

const actions = {
  async getRestaurant ({commit}) {
    let restaurant = await Restaurant.getRestaurant()
    restaurant.bg = 'url(\'/src/assets/bs.jpeg\')'
    console.log('restaurant', restaurant)
    commit('changeRestaurant', {
      restaurant: restaurant
    })
  }
}

const mutations = {
  changeRestaurant (state, payload) {
    state.restaurant = payload.restaurant
  },
  addNumberOfActivity (state, payload) {
    Vue.set(state.restaurant, 'num', payload.num)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
