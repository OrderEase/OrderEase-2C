import {Order} from '@/api/api.js'

const state = {
  ordersList: []
}

const getters = {
  uninishedOrdersList: state => {
    return state.ordersList.filter(
      order => {
        return order.isPay === 1 && order.finished === 0
      }
    )
  },
  finishedOrdersList: state => {
    return state.ordersList.filter(
      order => {
        return order.isPay === 1 && order.finished === 1
      }
    )
  },
  getOrderById: (state) => (orderId) => {
    return state.orderList.find(order => orderId === order.id)
  },
  dishesCount: (state, getters) => (orderId) => {
    return getters.getOrderById(orderId).dishes.length
  }
}

const actions = {
  async getOrdersList ({ commit }) {
    let ordersList = await Order.getAll()
    commit('setOrdersList', ordersList)
  },
  async urgeOrder ({ commit }, orderId, dishId) {
    let orderInfo = { 'dishId': dishId, 'like': 0, 'urge': 1 }
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
