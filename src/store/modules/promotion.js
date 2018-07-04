import {Promotion} from '@/api/api.js'
// import testPromotions from '@/api/promotions.json'

const state = {
  promotions: [
    // {
    //   id: 0,
    //   type: '减',
    //   data: '满19减6；满40减9；满60减10'
    // },
    // {
    //   id: 1,
    //   type: '折',
    //   data: '满20打8.5折'
    // }
  ],
  promotionsRawData: []
}

const getters = {

}

const actions = {
  async getPromotions ({commit}) {
    let promotions = await Promotion.getPromotions()
    // let promotions = testPromotions.promotions
    console.log('getPromotions', promotions)
    commit('changePromotions', {
      // promotions: testPromotions
      promotions: promotions
    })
    commit('setPromotionsRawData', promotions)
    console.log('promotions is null?', promotions.length)
    commit('restaurant/addNumberOfActivity', {
      num: promotions.length
    }, {root: true})
  }
}

const mutations = {
  changePromotions (state, payload) {
    let temp = payload.promotions
    let tempMinus = []
    let tempDiv = []
    for (let i = 0; i < temp.length; ++i) {
      tempMinus = tempMinus.concat(temp[i].rules.filter((rule) => {
        return rule.mode === 1
      }))
      tempDiv = tempDiv.concat(temp[i].rules.filter((rule) => {
        return rule.mode === 2
      }))
    }
    console.log('changePromotions', tempMinus)
    let id = state.promotions.length === 0 ? 0 : state.promotions[state.promotions.length - 1].id + 1
    for (let i = 0; i < tempMinus.length; ++i) {
      if (i % 3 === 0) {
        state.promotions.push({
          id: id,
          type: '减',
          data: '',
          show: i === 0
        })
        id = id + 1
      }
      let string = '满' + tempMinus[i].requirement + '减' + tempMinus[i].discount + ';'
      state.promotions[state.promotions.length - 1].data = state.promotions[state.promotions.length - 1].data + string
    }
    for (let i = 0; i < tempDiv.length; ++i) {
      if (i % 3 === 0) {
        state.promotions.push({
          id: id,
          type: '折',
          data: '',
          show: i === 0
        })
        id = id + 1
      }
      let string = '满' + tempDiv[i].requirement + '打' + 10 * (tempDiv[i].discount) + '折;'
      state.promotions[state.promotions.length - 1].data = state.promotions[state.promotions.length - 1].data + string
    }
  },
  setPromotionsRawData (state, promotions) {
    state.promotionsRawData = promotions
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
