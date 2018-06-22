// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import axios from 'axios'
// import VueRouter from 'vue-router'
import App from './App'
import menuData from './components/Menu/data.json'
// import selectData from './components/Cart/data.json'
import router from './router/index.js'

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$ajax = axios.create({
  baseURL: 'https://orderease.ml/v1/'
})

const store = new Vuex.Store({
  state: {
    // menus: new Array(0),
    menus: [],
    selectFoods: new Array(0)
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
    // check (state, payload) {
    //   let exist = false
    //   for (let i = 0; i < state.menus.length; i = i + 1) {
    //     if (state.menus[i].id === payload.id) {
    //       state.menus[i].count = payload.count
    //       exist = true
    //       break
    //     }
    //   }
    //   if (exist === false) {
    //     state.menus.push({
    //       id: payload.id,
    //       name: payload.name,
    //       price: payload.price,
    //       num: payload.count
    //     })
    //   } else {
    //     for (let i = 0; i < state.menus.length; i = i + 1) {
    //       if (state.menus[i].num === -1) {
    //         while (i < state.menus.length - 1) {
    //           state.menus[i] = state.menus[i + 1]
    //         }
    //         state.menus.pop()
    //       }
    //     }
    //   }
    //   console.log('check', state.menus)
    // },
    increaseCart (state, payload) {
      if (!payload.food.count) {
        state.selectFoods.push(payload.food)
        for (let i = 0; i < state.menus.length; ++i) {
          if (state.menus[i].dishes.filter(food => food.id === payload.food.id).length > 0) {
            Vue.set(state.menus[i].dishes.filter(food => food.id === payload.food.id)[0], 'count', 1)
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
    }
  },
  actions: {
    getMenus ({state}) {
      let responce = menuData
      state.menus = responce.content
      console.log('"menus:"', state.menus)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

router.push('menu')
