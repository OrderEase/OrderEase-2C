<template>
  <transition name="move">
    <div class="order-wrapper" ref="orderWrapper">
      <div class="order-details">
        <toast v-model="reminded" text="已催单" :time="1000"></toast>
        <div class="order-details-header">
            <x-icon class="back" type="ios-arrow-left" size="30" @click="back"></x-icon>
          <span>订单详情</span>
        </div>
        
        <div class="food-list">
          <div class="food-list-header">
            <span class="food-list-name">已点菜品</span>
            <x-icon class="arrow" type="ios-arrow-down" size="20"></x-icon>
          </div>
          <div class="food-item" v-for="food in foods">
            <img class="food-image" :src="food.img">
            <span class="food-name">{{ food.name }}</span>
            <span class="food-price">¥{{ food.price }}</span>
            <span class="food-amount">x{{ food.amount }}</span>
            <div class="remind-button-container" @click="remind">
              <x-circle
              class="waiting-time"
              :percent="food.waitingPercent"
              :stroke-width="5"
              :stroke-color="['#36D1DC', '#5B86E5']"
              anticlockwise>
              <span>{{ food.state }}</span>
            </x-circle>
            </div>
          </div>
          <div class="pay-bar">
            <div class="price-container">
              合计: <span class="total-price">¥{{ totalPrice }}</span>
            </div>
          </div>
        </div>
        
        <div class="order-info">
          <div class="order-number-container">
            <span class="order-number-key">
              订单号码
            </span>
            <span class="order-number-value">
              {{ order.number }}
            </span>  
          </div>
          <div class="order-date-container">
            <span class="order-date-key">
              下单日期
            </span>
            <span class="order-date-value">
              {{ order.date }}
            </span>
          </div>
          <div class="pay-method-container">
            <span class="pay-method-key">
              支付方式
            </span>
            <span class="pay-method-value">
              {{ order.payMethod }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import { Toast, XButton, XCircle } from 'vux'

export default {
  data () {
    return {
      reminded: false,
      order: {
        date: '2018-5-6',
        number: 'dfsd125368',
        payMethod: '微信支付'
      },
      foods: [
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          name: '皮蛋瘦肉粥',
          price: 10,
          amount: 3,
          state: '制作中',
          waitingPercent: 80
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          name: '皮蛋粥',
          price: 5,
          amount: 5,
          state: '制作中',
          waitingPercent: 30
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          name: '瘦肉粥',
          price: 8,
          amount: 4,
          state: '制作中',
          waitingPercent: 50
        }
      ]
    }
  },

  components: {
    XButton,
    XCircle,
    Toast
  },

  computed: {
    totalPrice: function () {
      let total = 0
      for (let i in this.foods) {
        let price = this.foods[i].price
        let amount = this.foods[i].amount
        total += price * amount
      }
      return total
    }
  },

  methods: {
    back () {
      this.$router.back(-1)
    },
    remind (event) {
      if (event.target.innerText === '催单') {
        this.reminded = true
        event.target.innerText = '已催单'
      }
      // if (event) {
      //   // alert(event)
      //   console.log(event)
      // }
    }
  },

  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.orderWrapper, {
          scrollY: true,
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    })
    for (let i in this.foods) {
      let time = setInterval(() => {
        if (this.foods[i].waitingPercent === 100) {
          clearInterval(time)
          this.foods[i].state = '催单'
        }
        this.foods[i].waitingPercent++
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.order-wrapper {
  width: 100%;
  background-color: #f3f5f7;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 50px;
  overflow: hidden;
  
  .order-details {
    
    .order-details-header {
      // padding: 10px;
      height: 50px;
      line-height: 50px;
      font-size: 15px;
      // margin-top: 20px;
      text-align: center;
      position: relative;
      background-color: white;
      
      .back {
        position: absolute;
        top: 0px;
        left: 0px;
        // font-size: 20px;
        // 
        padding: 10px;
        // fill: white;
      }
      
    }
      
    .food-list {
      margin: 10px;
      background: white;
      
      .food-list-header {
        height: 30px;  
        line-height: 30px;
        
        .food-list-name {
          margin: 8px;
          color: black;
          font-size: 13px;
        }
        .arrow {
          float: right;
          margin-top: 6px; 
          margin-right: 8px;
        }
      }
      
      .food-item {
        margin: 5px 0px;
        background-color: #f7f7f7;
        display: flex;
        align-items: center;
        font-size: 12px;
        position: relative;
        
        .food-image {
          margin: 8px;
          height: 80px;
          width: 80px;
        }
        
        .food-name {
          position: absolute;
          left: 95px;
          top: 10px;
          font-size: 13px;
        }
        
        .food-amount {
          font-size: 15px;
          color: #5a5b5d;
          position: absolute;
          left: 95px;
          top: 30px;
        }  
        
        .food-price {
          position: absolute;
          font-size: 15px;
          right: 15px;
          top: 5px;
        }
                 
        .remind-button-container {
          position: absolute;
          right: 8px;
          bottom: 8px;

          .waiting-time {          
            width: 50px;
            height: 50px;
          }
        }               
      }
      
      .pay-bar {
        height: 30px;
        margin-right: 10px;
        
        .price-container {
          float: right;
                  
          .total-price {
            color: red;
          }
          
        }
      }
    }
    
    .order-info {
      margin: 10px;
      padding: 10px 5px;
      background-color: white;
      font-size: 12px;

      .order-number-container {
        margin-bottom: 5px;
        .order-number-key {
          margin-right: 10px;
          color: #5a5b5d;
        }
        .order-number-value {
          
        }
      }
      
      .order-date-container {
        margin-bottom: 5px;
        .order-date-key {
          margin-right: 10px;
          color: #5a5b5d;
        }
        .order-date-value {
          
        }
      }
      
      .pay-method-container {
        .pay-method-key {
          margin-right: 10px;
          color: #5a5b5d;
        }
        .pay-method-value {
          
        }
      }
      
    }
  }
}
</style>
