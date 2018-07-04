import {User} from '@/api/api.js'
import router from '@/router/index.js'

const state = {
  isLogin: false,
  isLoginFail: false,
  username: '',
  payMethod: '微信支付',
  tableId: ''
}

const actions = {
  async login ({state, dispatch, commit}, payload) {
    commit('initUserInfor', payload)
    commit('startLogin')
    try {
      let status = await User.login(payload)
      if (status === 200) {
        dispatch('menu/getMenus', null, {root: true})
        dispatch('restaurant/getRestaurant', null, {root: true})
        dispatch('promotion/getPromotions', null, {root: true})
        dispatch('order/getOrdersList', null, {root: true})
        router.push('/menu')
      } else {
        commit('loginFail')
      }
    } catch (error) {
      commit('loginFail')
    }
  }
}

const mutations = {
  startLogin (state) {
    state.isLogin = true
  },
  loginFail (state) {
    state.isLoginFail = true
    state.isLogin = false
  },
  initUserInfor (state, payload) {
    state.username = payload.username
    state.tableId = payload.tableId
    console.log('tableId in state', state.tableId)
  },
  changePayMethod (state, payload) {
    state.payMethod = payload.payMethod
  },
  changeLoginState (state) {
    state.isLoginFail = false
  }
}

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
