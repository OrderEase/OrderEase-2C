// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuex from 'vuex'
import FastClick from 'fastclick'
import axios from 'axios'
import App from './App'
import router from './router/index.js'
import store from './store/index.js'

FastClick.attach(document.body)

Vue.config.productionTip = false

// axios.defaults.baseURL = 'http://172.18.159.249:5000/api/'
axios.defaults.baseURL = 'http://172.18.157.176:5000/api/'
axios.defaults.timeout = 3000
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

router.push('login?tableId=e23')
