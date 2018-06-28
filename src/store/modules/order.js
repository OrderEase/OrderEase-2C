import {Order} from '@/api/api.js'

const state = {
  ordersList: []
}

const getters = {
  unfinishedOrdersList (state) {
    return state.ordersList.filter(
      order => {
        return order.isPay === 1 && order.finished === 0
      }
    )
  },
  finishedOrdersList (state) {
    return state.ordersList.filter(
      order => {
        return order.isPay === 1 && order.finished === 1
      }
    )
  },
  getOrderById: (state) => (orderId) => {
    return state.orderList.find(order => orderId === order.id)
  }
}

const actions = {
  async getOrdersList ({ commit }) {
    console.log('getOrderList')
    let ordersList = await Order.getAll()
    commit('setOrdersList', ordersList)
  },
  async urgeOrder ({ commit }, orderId, dishId) {
    let orderInfo = { 'dishId': dishId, 'urge': 1 }
    console.log('urgeOrder')
    await Order.modifyOrderInfo(orderId, orderInfo)
    // commit('setOrdersList', ordersList)
  }
}

const mutations = {
  setOrdersList (state, ordersList) {
    state.ordersList = ordersList
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
