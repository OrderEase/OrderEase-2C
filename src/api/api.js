import axios from 'axios'

let User = {}
let Menu = {}
let Promotion = {}
let Order = {}
let Restaurant = {}

// 用户获取全部订单 
Order.getAll = () => {
  return new Promise((resolve, reject) => {
    axios.get('/orders/cuser/')
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            reject(new Error(error.response.data.message))
          } else {
            reject(error)
          }
        })
  })
}

// 用户修改订单消息
Order.modifyOrderInfo = (orderId, orderInfo) => {
  return new Promise((resolve, reject) => {
    axios.put('/orders/cuser/oid/' + orderId, orderInfo)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            reject(new Error(error.response.data.message))
          } else {
            reject(error)
          }
        })
  })
}

Order.submitOrder = (orderInfo) => {
  return new Promise((resolve, reject) => {
    axios.post('/orders/cuser/', orderInfo)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            reject(new Error(error.response.data.message))
          } else {
            reject(error)
          }
        })
  })
}

// 订单付款
Order.pay = (modifiedOrderId, payId) => {
  return new Promise((resolve, reject) => {
    axios.post('/orders/cuser/oid/' + modifiedOrderId, payId)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            reject(new Error(error.response.data.message))
          } else {
            reject(error)
          }
        })
  })
}

export { User, Menu, Promotion, Order, Restaurant }