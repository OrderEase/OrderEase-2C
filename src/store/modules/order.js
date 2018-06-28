import {Order} from '@/api/api.js'

const state = {
  ordersList: [],
  unpaidOrderId: null
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
  getOrderById (state) {
    return (orderId) => {
      return state.ordersList.find(order => orderId === order.id)
    }
  }
}

const actions = {
  async getOrdersList ({ commit }) {
    console.log('getOrderList')
    let ordersList = await Order.getAll()
    commit('setOrdersList', ordersList)
  },
  async placeOrder ({ commit }, orderInfo) {
    console.log('placeOrder')
    let orderId = await Order.submit(orderInfo)
    commit('setUnpaidOrderId', orderId)
  },
  async payOrder ({ commit }, payId) {
    console.log('placeOrder')
    let orderId = await Order.pay(payId)
    commit('setUnpaidOrderId', orderId)
  },
  async urgeOrder ({ commit }, orderId, dishId) {
    console.log('urgeOrder')
    let orderInfo = { 'dishId': dishId, 'urge': 1 }
    await Order.modify(orderId, orderInfo)
    // commit('', )
  }
}

const mutations = {
  setOrdersList (state, ordersList) {
    state.ordersList = ordersList
  },
  setUnpaidOrderId (state, orderId) {
    state.unpaidOrderId = orderId
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
