import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Menu from '@/components/Menu/Menu'
import Cart from '@/components/Cart/Cart'
import MyOrder from '@/components/MyOrder/MyOrder'
import Pay from '@/components/Pay/Pay'
import Shake from '@/components/Shake/Shake'
import OrderDetails from '@/components/OrderDetails/OrderDetails'

Vue.use(Router)

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
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/my-order',
      name: 'MyOrder',
      component: MyOrder
    },
    {
      path: '/shake',
      name: 'Shake',
      component: Shake
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/order-details',
      name: 'OrderDetails',
      component: OrderDetails
    }
  ]
})
