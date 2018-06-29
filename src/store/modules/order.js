import {Order} from '@/api/api.js'

const state = {
  ordersList: [],
  unpaidOrderId: null,
  paymentSuccess: false
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
    try {
      let ordersList = await Order.getAll()
      commit('setOrdersList', ordersList)
    } catch (error) {
      console.log('GetOrdersList [fail] ', error)
    }
  },
  async placeOrder ({ commit }, orderInfo) {
    console.log('placeOrder')
    try {
      let orderId = await Order.submit(orderInfo)
      console.log('return orderId ', orderId)
      commit('setUnpaidOrderId', orderId)
    } catch (error) {
      console.log('PlaceOrder [fail] ', error)
    }
  },
  async payOrder ({ commit }, payId) {
    console.log('payOrder')
    try {
      await Order.pay(payId)
      commit('setUnpaidOrderId', null)
      commit('setPaymentSuccess', true)
    } catch (error) {
      console.log('PayOrder [fail] ', error)
    }
  },
  async urgeOrder ({ commit }, orderId, orderItemId) {
    console.log('urgeOrder')
    let orderInfo = { 'orderItemId': orderItemId, 'urge': 1 }
    try {
      await Order.modify(orderId, orderInfo)
      // commit('', )
    } catch (error) {
      console.log('UrgeOrder [fail] ', error)
      commit('setPaymentSuccess', false)
    }
  }
}

const mutations = {
  setOrdersList (state, ordersList) {
    state.ordersList = ordersList
  },
  setUnpaidOrderId (state, orderId) {
    state.unpaidOrderId = orderId
  },
  setPaymentSuccess (state, paymentSuccess) {
    state.paymentSuccess = paymentSuccess
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
