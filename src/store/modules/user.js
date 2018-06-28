import {User} from '@/api/api.js'
import router from '@/router/index.js'

const state = {
  isLogin: false,
  isLoginFail: false,
  username: ''
}

const actions = {
  async login ({state, dispatch, commit}, payload) {
    commit('changeUsername', payload)
    commit('startLogin')
    let status = User.login(payload)
    if (status === 200) {
      dispatch('/menu/getMenus', null, {root: true})
      router.push('/menu')
    } else {
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
  }
}

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
