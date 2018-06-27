import Restaurant from '@/api/api.js'

const state = {
  restaurant: {}
}

const getters = {

}

const actions = {
  getRestaurant ({state}) {
    Axios.get('/restrt')
      .then(function (responce) {
        console.log('restaurant', responce.data)
        state.restaurant = responce.data
        Vue.set(state.restaurant, 'bg', 'url(\'/src/assets/bs.jpeg\')')
        // state.restaurant.num = 2
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

const mutations = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}