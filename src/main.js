// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import axios from 'axios'
// import VueRouter from 'vue-router'
import App from './App'
// import menuData from './components/Menu/data.json'
// import selectData from './components/Cart/data.json'
import router from './router/index.js'

FastClick.attach(document.body)

Vue.config.productionTip = false
const Axios = axios.create({
  baseURL: 'http://172.18.158.105:5000/api/'
})

const store = new Vuex.Store({
  state: {
    // menus: new Array(0),
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
    username: '',
    menus: [],
    selectFoods: new Array(0),
    restaurant: {},
    selected_id: 0
  },
  getters: {
    totalPrice: (state, getters) => {
      let sum = 0
      for (let i = 0; i < state.selectFoods.length; ++i) {
        sum += state.selectFoods[i].price * state.selectFoods[i].count
      }
      return sum
    }
  },
  mutations: {
    increaseCart (state, payload) {
      if (!('count' in payload.food) || payload.food.count === undefined) {
        // state.selectFoods.push(payload.food)
        for (let i = 0; i < state.menus.length; ++i) {
          if (state.menus[i].dishes.filter(food => food.id === payload.food.id).length > 0) {
            Vue.set(state.menus[i].dishes.filter(food => food.id === payload.food.id)[0], 'count', 1)
            state.selectFoods.push(state.menus[i].dishes.filter(food => food.id === payload.food.id)[0])
            break
          }
        }
        console.log('selected foods add 1', state.selectFoods)
        return payload.food
      }
      let count = payload.food.count
      state.selectFoods.filter(food => food.id === payload.food.id)[0].count = count + 1
      for (let i = 0; i < state.menus.length; ++i) {
        if (state.menus[i].dishes.filter(food => food.id === payload.food.id).length > 0) {
          console.log('add 2', state.menus[i].dishes.filter(food => food.id === payload.food.id)[0].count)
          state.menus[i].dishes.filter(food => food.id === payload.food.id)[0].count = count + 1
          break
        }
      }
      console.log('selected foods add 2', state.selectFoods)
      return payload.food
    },
    decreaseCart (state, payload) {
      let count = payload.food.count
      state.selectFoods.filter(food => food.id === payload.food.id)[0].count = count - 1
      for (let i = 0; i < state.menus.length; ++i) {
        if (state.menus[i].dishes.filter(food => food.id === payload.food.id).length > 0) {
          state.menus[i].dishes.filter(food => food.id === payload.food.id)[0].count = count - 1
          break
        }
      }
      console.log('selected foods delete', state.selectFoods)
      return payload.food
    },
    changeSelectedId (state, payload) {
      state.selected_id = payload.id
    }
  },
  actions: {
    login ({state}, payload) {
      state.username = payload.username
      router.push('/menu')
      console.log('username:', payload.username)
      Axios.post('/cusers/session', {
        'username': payload.username
      })
      .then((responce) => {
        if (responce.code === 200) {
          this.$router.push('/menu')
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
          // let responce = JSON.stringify(menuData)
          // console.log('string responce', JSON.stringify(menuData))
          // responce = JSON.parse(responce.data)
          // console.log('json responce', responce)
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
