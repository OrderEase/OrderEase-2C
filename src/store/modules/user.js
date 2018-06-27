import User from '@/api/api.js'

const state = {
  isLogin: false,
  isLoginFail: false,
  username: ''
}

const actions = {
  login ({state, dispatch}, payload) {
    state.username = payload.username
    state.isLogin = true
    console.log('username:', payload.username)
    Axios.post('/cusers/session', {
      'username': payload.username
    })
    .then((responce) => {
      console.log('responce:', responce)
      if (responce.status === 200) {
        dispatch('getMenus')
        dispatch('getRestaurant')
        dispatch('getPromotions')
        router.push('/menu')
      } else {
        state.isLogin = false
        state.isLoginFail = true
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

const mutations = {

}

export default {
    namespaced: true,
    state,
    // getters,
    actions,
    mutations
}