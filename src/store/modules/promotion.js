// import {Promotion} from '@/api/api.js'

const state = {
  promotions: [
    {
      id: 0,
      type: '减',
      data: '满19减6；满40减9；满60减10'
    },
    {
      id: 1,
      type: '折',
      data: '满20打8.5折'
    }
  ]
}

const getters = {

}

const actions = {
  getPromotions ({state}) {
    // Axios.get('/promotions')
    // .then(function (responce) {
    //   console.log('promotions', responce.data)
    //   Vue.set(state.restaurant, 'num', responce.data.length)
    // })
    // .catch(function (error) {
    //   console.log(error)
    // })
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
