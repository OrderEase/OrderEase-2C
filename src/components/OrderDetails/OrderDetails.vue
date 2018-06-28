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
          <div class="dish-item" v-for="(dish, index) in order.dishes">
            <img class="dish-image" :src="dish.img">
            <div class="dish-info">
              <div class="dish-name">{{ dish.name }}</div>
              <div class="dish-count">x{{ order.orderItems[index].quantity }}</div>
            </div>
            <div class="dish-price">¥<span>{{ dish.price }}</span></div>
            <div class="urge-button-container" 
                @click="urge(order.id, dish.id)" 
                v-show="!order.finished">
              <x-circle
              class="waiting-time"
              :percent="calculateWaitingPercent(order.payDate)"
              :stroke-width="5"
              :stroke-color="'#539EF9'"
              anticlockwise>
              <span>{{ getCurrentOrderItemState(order.orderItems[index]) }}</span>
            </x-circle>
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
      urged: false
    }
  },
  created () {
    console.log('OrderDetails ', this.getOrderById(this.$route.params.orderId))
    this.order = this.getOrderById(this.$route.params.orderId)
  },
  computed: {
    totalPrice: function () {
      let total = 0
      for (let i in this.dishes) {
        let price = this.dishes[i].price
        let count = this.dishes[i].count
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
      this.$router.back(-1)
    },
    async urge (event, orderId, dishId) {
      if (event.target.innerText === '催单') {
        this.urged = true
        await this.$store.dispatch('order/urgeOrder', orderId, dishId)
        event.target.innerText = '已催单'
      }
    },
    calculateWaitingPercent (payDate) {
      return 80
    },
    getCurrentOrderItemState (orderItem) {
      if (orderItem.finished) {
        return '已上菜'
      }
      if (orderItem.urge) {
        return '已催单'
      }
      let currentPercent = this.calculateWaitingPercent(this.order.payDate)
      if (!orderItem.urge && currentPercent === 100) {
        return '催单'
      }
      return '制作中'
    }
  },

  mounted () {
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
    for (let i in this.dishes) {
      let time = setInterval(() => {
        if (this.dishes[i].waitingPercent === 100) {
          clearInterval(time)
          this.dishes[i].state = '催单'
        }
        this.dishes[i].waitingPercent++
      }, 1000)
    }
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
