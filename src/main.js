// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import axios from 'axios'
// import VueRouter from 'vue-router'
import App from './App'
import router from './router/index.js'

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$ajax = axios.create({
  baseURL: 'https://orderease.ml/v1/'
})

const store = new Vuex.Store({
  state: {
    orders: new Array(0)
  },
  getters: {
  },
  mutations: {
    check (state, payload) {
      let exist = false
      for (let i = 0; i < state.orders.length; i = i + 1) {
        if (state.orders[i].id === payload.id) {
          state.orders[i].count = payload.count
          exist = true
          break
        }
      }
      if (exist === false) {
        state.orders.push({
          id: payload.id,
          name: payload.name,
          price: payload.price,
          num: payload.count
        })
      } else {
        for (let i = 0; i < state.orders.length; i = i + 1) {
          if (state.orders[i].num === -1) {
            while (i < state.orders.length - 1) {
              state.orders[i] = state.orders[i + 1]
            }
            state.orders.pop()
          }
        }
      }
      console.log('check', state.orders)
    }
  },
  actions: {

  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

router.push('menu')
