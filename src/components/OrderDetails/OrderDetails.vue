<template>
  <transition name="move">
    <div class="order-wrapper">
      <div class="order-details-header">
        <x-icon class="back" type="ios-arrow-left" size="25" @click="back"></x-icon>
        <span>订单详情</span>
      </div>
      <div class="order-details-wrapper" ref="orderDetailsWrapper">
        <div class="order-details-body">
          <toast v-model="reminded" text="已催单" :time="1000"></toast>        
          <div class="dish-list">
            <div class="dish-list-header">已点菜品</div>
            <div class="dish-item" v-for="dish in dishes">
              <img class="dish-image" :src="dish.img">
              <div class="dish-info">
                <div class="dish-name">{{ dish.name }}</div>
                <div class="dish-amount">x{{ dish.amount }}</div>
              </div>
              <div class="dish-price">¥{{ dish.price }}</div>
              <div class="remind-button-container" @click="remind">
                <x-circle
                class="waiting-time"
                :percent="dish.waitingPercent"
                :stroke-width="5"
                :stroke-color="['#36D1DC', '#5B86E5']"
                anticlockwise>
                <span>{{ dish.state }}</span>
              </x-circle>
            </div>
          </div>
          <div class="pay-bar">
            <div class="price-container">
              合计 <span class="total-price">¥{{ totalPrice }}</span>
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
      dishes: [
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
      for (let i in this.dishes) {
        let price = this.dishes[i].price
        let amount = this.dishes[i].amount
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
        this.scroll = new BScroll(this.$refs.orderDetailsWrapper, {
          scrollY: true,
          click: true
        })
        console.log(this.scroll)
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
      height: 40px;
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
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 0.5px;
            color: #1C1D25;
          }
          
          .dish-amount {
            font-size: 15px;
            color: #747881;
          }  
        }
        
        .dish-price {
          margin-top: -3px;
          margin-right: 5px;
          font-size: 16px;
          color: #101010;
        }
                 
        .remind-button-container {
          position: absolute;
          right: 0px;
          bottom: 15px;

          .waiting-time {          
            width: 45px;
            height: 45px;
          }
        }               
      }
      
      .pay-bar {
        height: 30px;
        padding: 12px 15px 10px 15px;
        
        .price-container {
          float: right;
          font-size: 12px;
          color: #101010;
                
          .total-price {
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
      font-size: 12px;

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
