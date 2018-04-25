import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Menu from '@/components/Menu/Menu'
import Cart from '@/components/Cart/Cart'
import Order from '@/components/Order/Order'
import Pay from '@/components/Pay/Pay'
import Shake from '@/components/Shake/Shake'
import FoodDetails from '@/components/FoodDetails/FoodDetails'

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
      path: '/order',
      name: 'Order',
      component: Order
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
      path: '/food-details',
      name: 'FoodDetails',
      component: FoodDetails
    }
  ]
})
