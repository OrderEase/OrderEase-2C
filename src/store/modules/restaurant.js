import {Restaurant} from '@/api/api.js'
// import Vue from 'vue'

const state = {
  restaurant: {}
}

const getters = {

}

const actions = {
  async getRestaurant ({commit, dispatch}) {
    let restaurant = await Restaurant.getRestaurant()
    // restaurant.bg = 'url(\'/src/assets/bs.jpeg\')'
    console.log('restaurant', restaurant)
    restaurant.num = 0
    commit('changeRestaurant', {
      restaurant: restaurant
    })
    dispatch('promotion/getPromotions', null, {root: true})
  }
}

const mutations = {
  changeRestaurant (state, payload) {
    state.restaurant = JSON.parse(JSON.stringify(payload.restaurant))
    console.log('change restaurant', state.restaurant)
  },
  addNumberOfActivity (state, payload) {
    // Vue.set(state.restaurant, 'num', payload.num)
    state.restaurant.num = payload.num
    console.log('after add number', state.restaurant.num)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
