<template>
  <div class="order-wrapper">
    <toast v-model="urged" text="已催单" :time="1000"></toast>        
    <div class="order-details-header">
      <x-icon class="back" type="ios-arrow-left" size="25" @click="back"></x-icon>
      <span>订单详情</span>
    </div>
    <div class="order-details-wrapper" ref="orderDetailsWrapper">
      <div class="order-details-body">
        <div class="dish-list">
          <div class="dish-list-header">已点菜品</div>
          <div class="dish-item" v-for="orderItem in order.orderItems">
            <img class="dish-image" :src="getDishImg(orderItem.dishId)">
            <div class="dish-info">
              <div class="dish-name">{{ getDishName(orderItem.dishId) }}</div>
              <div class="dish-count">x{{ orderItem.quantity }}</div>
            </div>
            <div class="dish-price">¥<span>{{ getDishPrice(orderItem.dishId) }}</span></div>
            <div class="urge-button-container" 
                @click="urge(orderItem)"
                v-show="!order.finished">
              <x-circle
                class="waiting-time"
                :percent="orderItem.waitingPercent"
                :stroke-width="5"
                :stroke-color="'#539EF9'"
                anticlockwise>
                <span>{{ orderItem.state }}</span>
              </x-circle>
            </div>
            <div class="like-button-container" 
                @click="like(orderItem)" 
                v-show="order.finished">
              <img class="like-icon" :src="orderItem.like ? likeActiveIcon : likeUnactiveIcon">
            </div>
          </div>
          <div class="total-price-container">
            <div class="total-price">
              合计 <span>¥{{ totalPrice }}</span>
            </div>
          </div>
        </div>
        <div class="order-info">
          <div class="order-number-container">
            <span class="order-number-key">
              订单号码
            </span>
            <span class="order-number-value">
              {{ order.id }}
            </span>  
          </div>
          <div class="order-date-container">
            <span class="order-date-key">
              下单日期
            </span>
            <span class="order-date-value">
              {{ order.payDate }}
            </span>
          </div>
          <div class="pay-method-container">
            <span class="pay-method-key">
              支付方式
            </span>
            <span class="pay-method-value">
              {{ order.payWay }}
            </span>
          </div>
        </div>
      </div>        
    </div>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import { Toast, XCircle } from 'vux'
import { mapGetters } from 'vuex'

export default {
  components: {
    Toast,
    XCircle
  },
  data () {
    return {
      order: {},
      urged: false,
      expectedMinutes: 1,
      likeActiveIcon: require('../../assets/orderDetails/like_active.svg'),
      likeUnactiveIcon: require('../../assets/orderDetails/like_unactive.svg'),
      time: null
    }
  },
  created () {
    console.log('OrderDetails ', this.getOrderById(this.$route.params.orderId))
    this.order = this.getOrderById(this.$route.params.orderId)
    // add waitingPercent and state for each orderItem in the order
    for (let i in this.order.orderItems) {
      this.$set(this.order.orderItems[i], 'waitingPercent', this.getWaitingPercent(this.order.orderItems[i]))
      this.$set(this.order.orderItems[i], 'state', this.getOrderItemState(this.order.orderItems[i]))
    }
    console.log('after created')
  },
  computed: {
    totalPrice: function () {
      let total = 0
      for (let i in this.order.dishes) {
        let price = this.order.dishes[i].price
        let count = this.order.orderItems[i].quantity
        total += price * count
      }
      return total
    },
    ...mapGetters('order', {
      getOrderById: 'getOrderById'
    })
  },
  methods: {
    back () {
      console.log('time ', this.time)
      clearInterval(this.time)
      this.$router.back(-1)
    },
    async urge (orderItem) {
      console.log('urge')
      console.log(orderItem)
      if (orderItem.state === '催单') {
        let orderInfo = { 'orderId': this.order.id, 'orderItemId': orderItem.id }
        console.log(orderInfo)
        await this.$store.dispatch('order/urgeOrder', orderInfo)
        this.urged = true
        orderItem.urge = true
        orderItem.state = this.getOrderItemState(orderItem)
      }
    },
    async like (orderItem) {
      if (!orderItem.like) {
        console.log('orderItemId ', orderItem.id)
        console.log('dishId ', orderItem.dishId)
        let orderInfo = { 'orderId': this.order.id, 'orderItemId': orderItem.id }
        await this.$store.dispatch('order/likeOrder', orderInfo)
        orderItem.like = true
      }
    },
    getDishImg (dishId) {
      return this.order.dishes.find(dish => dish.id === dishId).img
    },
    getDishName (dishId) {
      return this.order.dishes.find(dish => dish.id === dishId).name
    },
    getDishPrice (dishId) {
      return this.order.dishes.find(dish => dish.id === dishId).price
    },
    getWaitingPercent (orderItem) {
      if (orderItem.finished) {
        return 100
      }
      let payTime = (new Date(this.order.payDate)).getTime()
      let currentTime = (new Date()).getTime()
      let DiffMinutes = (currentTime - payTime) / (1000 * 60)
      let waitingPercent = (DiffMinutes / this.expectedMinutes) * 100
      if (waitingPercent > 100) {
        waitingPercent = 100
      }
      return waitingPercent
    },
    getOrderItemState (orderItem) {
      if (orderItem.finished) {
        return '已上菜'
      }
      if (orderItem.urge) {
        return '已催单'
      }
      if (!orderItem.urge && orderItem.waitingPercent === 100) {
        return '催单'
      }
      return '制作中'
    }
  },
  mounted () {
    console.log('start mounted')
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.orderDetailsWrapper, {
          scrollY: true,
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    })
    this.time = setInterval(() => {
      console.log('set interval')
      for (let i in this.order.orderItems) {
        console.log('waitingPercent ', this.order.orderItems[i].waitingPercent)
        if (this.order.orderItems[i].waitingPercent === 100) {
          clearInterval(this.time)
          console.log('clear')
          this.order.orderItems[i].state = '催单'
        }
        this.order.orderItems[i].waitingPercent = this.getWaitingPercent(this.order.orderItems[i])
        this.order.orderItems[i].state = this.getOrderItemState(this.order.orderItems[i])
      }
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.order-wrapper {
  background-color: #F6F9FF;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  .order-details-header {
    height: 50px;
    display: flex;
    flex-shrink: 0;    
    font-size: 18px;
    text-align: center;
    position: relative;
    background-color: white;
    display: flex;
    justify-content: center;
    
    .back {
      align-self: center;
      position: absolute;
      left: 2%;
      padding-bottom: 2px;
    }
    span {
      align-self: center;      
    }
  }
    
  .order-details-wrapper {
    margin: 0 20px;
    padding-top: 20px;
    flex-grow: 1;
    overflow: hidden;
         
    .order-details-body::after {
      content: '';
      display: block;
      height: 50px;
    }
    
    .dish-list {
      margin-bottom: 15px;
      background-color: white;
      border-radius: 5px;
      
      .dish-list-header {
        margin: 0 15px;
        height: 30px;  
        line-height: 30px;
        border-bottom: 1px solid #EBEBEB;
        padding-top: 5px;
        color: #575757;
        font-size: 14px;
      }
      
      .dish-item {
        margin: 0 15px;
        padding: 15px 0;
        display: flex;
        font-size: 12px;
        position: relative;
        border-bottom: 1px dotted #EBEBEB;
        
        .dish-image {
          height: 70px;
          width: 80px;
          border-radius: 5px;
        }
        
        .dish-info {
          margin-left: 10px;
          flex-grow: 2;
          
          .dish-name {
            font-size: 15px;
            font-weight: bold;
            letter-spacing: 0.5px;
            color: #1C1D25;
          }
          
          .dish-count {
            font-size: 15px;
            color: #747881;
          }  
        }
        
        .dish-price {
          margin-top: -3px;
          margin-right: 5px;
          color: #101010;
          font-size: 14px;
          
          span {
            margin-left: 1.5px;
            font-size: 16px;
          }
        }
                 
        .urge-button-container {
          position: absolute;
          right: 0px;
          bottom: 15px;

          .waiting-time {          
            width: 45px;
            height: 45px;
          }
        }
        
        .like-button-container {
          position: absolute;
          right: 0px;
          bottom: 15px;

          .like-icon {          
            width: 30px;
            height: 30px;
            fill: #dbdbdb;
          }
          
          .like-active {
            fill: #539EF9;
          }
        }               
      }
      
      .total-price-container {
        height: 30px;
        padding: 12px 15px 10px 15px;
        
        .total-price {
          float: right;
          font-size: 12px;
          color: #101010;
                
          span {
            color: #323232;
            font-weight: bold;
            font-size: 18px;
            vertical-align: middle;
          }          
        }
      }
    }
    
    .order-info {
      border-radius: 5px;
      padding: 12px 15px;
      background-color: white;
      font-size: 14px;

      .order-number-key, .order-date-key, .pay-method-key {
        margin-right: 15px;
        color: #5A5B5D;
      }
      .order-number-value, .order-date-value, .pay-method-value {
        color: #101010;
      }
      .order-number-container, .order-date-container, .pay-method-container {
        margin-bottom: 5px;
      }    
    }
  }
}
</style>
