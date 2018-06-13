import menusData from '../Menu/data.json'

let api = {}

api.menu = menusData
api.userId = undefined
api.ordersId = undefined
api.tableId = undefined

api.login = function (simpleID) {
  this.$ajax.post('/cuser/session', {
    'username': simpleID
  })
    .then(function (responce) {
      pass
    })
    .catch(function (error) {
      pass
    })
}

api.logout = function () {
  this.$ajax.put('/cuser/session')
    .then(function (responce) {
      pass
    })
    .catch(function (error) {
      pass
    })
}

api.getMenu = function () {
  if (typeof this.menu === 'undefined') {
    this.$ajax.get('/rstr')
      .then(function (responce) {
        pass
      })
      .catch(function (error) {
        pass
      })
    pass
  }
  return this.menu
}

api.postOrder = function (dishes) {
  let dishesIds = []
  this.$ajax.post('/order/cuser/'+this.userId.toString(), {
    'tableId': this.tableId,
    "dishes": dishesIds
  })
    .then(function (responce) {
      pass
    })
    .catch(function (error) {
      pass
    })
}

api.payOff = function (money) {
  pass
}

api.getOrder = function (orderId) {
  this.$ajax.get('/order/cuser/' + this.userId.toString() + '/oid/' + orderId.toString())
    .then(function (responce) {
      pass
    })
    .catch(function (error) {
      pass
    })
}

api.getOrders = function () {
  if (typeof this.ordersId === 'undefined') {
    this.$ajax.get('/order/cuser/' + this.userId.toString())
      .then(function (responce) {
        pass
      })
      .catch(function (error) {
        pass
      })
  }
}

export {
  api
};