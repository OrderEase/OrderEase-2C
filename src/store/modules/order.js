import {Order} from '@/api/api.js'

const state = {
  ordersList: [],
  currentOrderId: null,
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
  },
  unfinishedOrdersCount (state, getters) {
    return getters.unfinishedOrdersList.length
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
      commit('setCurrentOrderId', orderId)
    } catch (error) {
      console.log('PlaceOrder [fail] ', error)
    }
  },
  async payOrder ({ state, commit }, payInfo) {
    console.log('payOrder')
    try {
      await Order.pay(state.currentOrderId, payInfo)
      commit('setPaymentSuccess', true)
    } catch (error) {
      console.log('PayOrder [fail] ', error)
    }
  },
  async deleteOrder ({ state, commit }, orderId) {
    console.log('deleteOrder')
    try {
      await Order.delete(state.currentOrderId)
      commit('setCurrentOrderId', null)
    } catch (error) {
      console.log('DeleteOrder [fail] ', error)
    }
  },
  async urgeOrder ({ commit }, payload) {
    console.log('urgeOrder')
    let orderInfo = { 'orderItemId': payload.orderItemId, 'urge': 1 }
    try {
      await Order.modify(payload.orderId, orderInfo)
    } catch (error) {
      console.log('UrgeOrder [fail] ', error)
    }
  },
  async likeOrder ({ commit }, payload) {
    console.log('likeOrder')
    console.log('orderItemId', payload.orderItemId)
    let orderInfo = { 'orderItemId': payload.orderItemId, 'like': 1 }
    console.log('orderInfo ', orderInfo)
    try {
      await Order.modify(payload.orderId, orderInfo)
    } catch (error) {
      console.log('LikeOrder [fail] ', error)
    }
  }
}

const mutations = {
  setOrdersList (state, ordersList) {
    state.ordersList = ordersList
  },
  setCurrentOrderId (state, orderId) {
    state.currentOrderId = orderId
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
