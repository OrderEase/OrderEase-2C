import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Menu from '@/components/Menu/Menu'
// import Cart from '@/components/Cart/shopCart'
import MyOrder from '@/components/MyOrder/MyOrder'
import Pay from '@/components/Pay/Pay'
// import Shake from '@/components/Shake/Shake'
import OrderDetails from '@/components/OrderDetails/OrderDetails'
// import bussiness from '@/components/Menu/bussiness/bussiness'
import Login from '@/components/Login/login'

Vue.use(Router)
Vue.use(Vuex)
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })

export default new Router({
  routes: [
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    // {
    //   path: '/cart',
    //   name: 'Cart',
    //   component: Cart
    // },
    {
      path: '/my-order',
      name: 'MyOrder',
      component: MyOrder
    },
    // {
    //   path: '/shake',
    //   name: 'Shake',
    //   component: Shake
    // },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/order-details/:orderId',
      name: 'OrderDetails',
      component: OrderDetails
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
