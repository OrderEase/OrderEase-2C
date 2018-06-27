// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import axios from 'axios'
import App from './App'
import router from './router/index.js'

FastClick.attach(document.body)

Vue.config.productionTip = false
// const Axios = axios.create({
//   // baseURL: 'http://172.18.158.105:5000/api/'
//   baseURL: 'http://172.18.159.249:5000/api/',
//   withCredentials: true
// })

axios.defaults.baseURL = process.env.BASE_URL
axios.defaults.withCredentials = true

const store = new Vuex.Store({
  state: {
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
    ],
    isLogin: false,
    isLoginFail: false,
    username: '',
    menus: [],
    selectDishes: new Array(0),
    restaurant: {},
    selected_id: 0
  },
  getters: {
    totalPrice: (state, getters) => {
      let sum = 0
      for (let i = 0; i < state.selectDishes.length; ++i) {
        sum += state.selectDishes[i].price * state.selectDishes[i].count
      }
      return sum
    }
  },
  mutations: {
    increaseCart (state, payload) {
      if (!('count' in payload.dish) || payload.dish.count === undefined) {
        for (let i = 0; i < state.menus.length; ++i) {
          if (state.menus[i].dishes.filter(dish => dish.id === payload.dish.id).length > 0) {
            Vue.set(state.menus[i].dishes.filter(dish => dish.id === payload.dish.id)[0], 'count', 1)
            state.selectDishes.push(state.menus[i].dishes.filter(dish => dish.id === payload.dish.id)[0])
            break
          }
        }
        console.log('selected dishes add 1', state.selectDishes)
        return payload.dish
      }
      let count = payload.dish.count
      state.selectDishes.filter(dish => dish.id === payload.dish.id)[0].count = count + 1
      for (let i = 0; i < state.menus.length; ++i) {
        if (state.menus[i].dishes.filter(dish => dish.id === payload.dish.id).length > 0) {
          console.log('add 2', state.menus[i].dishes.filter(dish => dish.id === payload.dish.id)[0].count)
          state.menus[i].dishes.filter(dish => dish.id === payload.dish.id)[0].count = count + 1
          break
        }
      }
      console.log('selected dishes add 2', state.selectDishes)
      return payload.dish
    },
    decreaseCart (state, payload) {
      let count = payload.dish.count
      state.selectDishes.filter(dish => dish.id === payload.dish.id)[0].count = count - 1
      for (let i = 0; i < state.menus.length; ++i) {
        if (state.menus[i].dishes.filter(dish => dish.id === payload.dish.id).length > 0) {
          state.menus[i].dishes.filter(dish => dish.id === payload.dish.id)[0].count = count - 1
          break
        }
      }
      console.log('selected dishes delete', state.selectDishes)
      return payload.dish
    },
    changeSelectedId (state, payload) {
      state.selected_id = payload.id
    }
  },
  actions: {
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
    },
    getMenus ({state}) {
      Axios.get('/menus/cuser')
        .then(function (responce) {
          console.log('menu responce', responce)
          responce = responce.data
          responce.content.sort((a, b) => {
            return a.rank >= b.rank
          })
          for (let i = 0; i < responce.content.length; ++i) {
            responce.content[i].dishes.sort((a, b) => {
              return a.rank >= b.rank
            })
          }
          state.menus = responce.content
          state.selected_id = state.menus[0].id
          console.log('"menus:"', state.menus)
        })
        .catch(function (error) {
          console.log(error.request)
        })
    },
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
    },
    getPromotions ({state}) {
      Axios.get('/promotions')
        .then(function (responce) {
          console.log('promotions', responce.data)
          Vue.set(state.restaurant, 'num', responce.data.length)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

router.push('login')
