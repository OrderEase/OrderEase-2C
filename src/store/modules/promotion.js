import {Promotion} from '@/api/api.js'

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
  async getPromotions ({commit}) {
    let promotions = await Promotion.getPromotions()
    console.log('getPromotions', promotions)
    commit('changePromotions', {
      promotions: promotions
    })
  }
}

const mutations = {
  changePromotions (state, payload) {
    // let temp = payload.promotions
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
