import {User} from '@/api/api.js'
import router from '@/router/index.js'

const state = {
  isLogin: false,
  isLoginFail: false,
  username: '',
  payMethod: '微信支付'
}

const actions = {
  async login ({state, dispatch, commit}, payload) {
    commit('changeUsername', payload)
    commit('startLogin')
    try {
      let status = await User.login(payload)
      if (status === 200) {
        dispatch('menu/getMenus', null, {root: true})
        dispatch('promotion/getPromotions', null, {root: true})
        dispatch('restaurant/getRestaurant', null, {root: true})
        router.push('/menu')
      } else {
        commit('loginFail')
      }
    } catch (error) {
      router.push('/menu')
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
  changeUsername (state, payload) {
    state.username = payload.username
  },
  changePayMethod (state, payload) {
    state.payMethod = payload.payMethod
  }
}

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
