<template>
    <transition name="move">
      <div class="order-wrapper" ref="myOrderWrapper">
        <div class="my-order">
          <tab>
            <tab-item selected @on-item-click="onItemClick">未完成订单</tab-item>
            <tab-item @on-item-click="onItemClick">历史订单</tab-item>
          </tab>
          <div class="unfinished-orders" v-show="showUnfinishedOrder" v-for="order in unfinishedOrders">
            <div class="unfinished-order-item">
              <img class="order-image" :src="order.img">
              <div class="order-info">
                <div class="order-number">订单号: {{ order.number }}</div>
                <div class="order-price">总价: {{ order.price }}</div>
              </div>
              <div class="order-state">仍有3个菜未上</div>
            </div>
          </div>
          <div class="history-orders" v-show="showHistoryOrder" v-for="order in historyOrders">
            <div class="history-order-item">
              <img class="order-image" :src="order.img">
              <div class="order-info">
                <div class="order-number">订单号: {{ order.number }}</div>
                <div class="order-date">日期: {{ order.date }}</div>
              </div>
              <div class="order-price">消费金额: {{ order.price }}¥</div>
            </div>
          </div>
          <!-- <div class="food-list" v-for="food in foods">
            <div class="food-item">
              <img class="food-image" :src="food.img">
              <span class="food-name">{{ food.name }}</span>
              <span class="food-price">{{ food.price }}</span>
              <span class="food-amount">{{ food.amount }}</span>
              <span class="food-total-price"> {{ calculateTotalPriceForThisFood(food.price, food.amount) }}</span>
              <x-button mini>催单</x-button>
            </div>
          </div> -->
          <!-- <div class="pay-bar">
            <span class="total-price">{{ totalPrice }}</span>
            <x-button mini type="primary">马上支付</x-button>
          </div> -->
        </div>
      </div>
    </transition>
</template>

<script>
import BScroll from 'better-scroll'
import { Tab, TabItem, XButton } from 'vux'

// let totalPrice = 0

export default {
  data () {
    return {
      // foods: [
      //   {
      //     img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
      //     name: '皮蛋瘦肉粥',
      //     price: 10,
      //     amount: 3
      //   },
      //   {
      //     img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
      //     name: '皮蛋粥',
      //     price: 5,
      //     amount: 5
      //   },
      //   {
      //     img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
      //     name: '瘦肉粥',
      //     price: 8,
      //     amount: 4
      //   }
      // ],
      showUnfinishedOrder: true,
      showHistoryOrder: false,

      unfinishedOrders: [
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          number: '123456',
          price: 100
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          number: '123456',
          price: 100
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          number: '123456',
          price: 100
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          number: '123456',
          price: 100
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          number: '123456',
          price: 100
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          number: '123456',
          price: 100
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          number: '123456',
          price: 100
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          number: '123456',
          price: 100
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          number: '123456',
          price: 100
        }
      ],

      historyOrders: [
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          date: '2018-5-6',
          number: '123456',
          price: 10
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          date: '2018-5-6',
          number: '123456',
          price: 10
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          date: '2018-5-6',
          number: '123456',
          price: 10
        }
      ]
    }
  },

  components: {
    XButton,
    Tab,
    TabItem
  },

  computed: {
    totalPrice: function () {
      let total = 0
      for (let food in this.foods) {
        total += food.price * food.amount
      }
      return total
    }
  },

  methods: {
    calculateTotalPriceForThisFood (price, amount) {
      let priceForThisFood = price * amount
      // totalPrice += priceForThisFood
      return priceForThisFood
    },
    onItemClick (index) {
      // console.log('on item click:', index)
      this.showUnfinishedOrder = !this.showUnfinishedOrder
      this.showHistoryOrder = !this.showHistoryOrder
    }
  },

  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.myOrderWrapper, {
          scrollY: true,
          click: true
        })
        // console.log(this.scroll)
        // console.log(this.$refs.orderWrapper)
      } else {
        this.scroll.refresh()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.order-wrapper {
  width: 100%;
  // height: 100%;
  background-color: #f3f5f7;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 50px;
  overflow: hidden;
  
  .my-order {
    .order-image {
      height: 100px;
      width: 100px;
    }
    
    .unfinished-orders {
      .unfinished-order-item {
        margin-bottom: 5px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        .order-image {
          margin: 5px;
        }
          
        .order-info {
          // height: 100px;
          flex-grow: 1;
          text-align: center;
          margin-left: 10px;
          margin-right: 15px;
          
          .order-number {
            height: 50px;
            line-height: 50px;
            // font-size: 10px;
            overflow: hidden;
            border:  1px solid rgba(7,17,27,0.1);
            border-radius: 5px;
          }
          
          .order-price {
            // span {
            //   font-size: 20px;
            // }
            overflow: hidden;
            height: 50px;
            line-height: 50px;
            // font-size: 15px;
            border:  1px solid rgba(7,17,27,0.1);
          }
        }
        
        .order-state {
          // position: absolute;
          // right: 15px;
          // align-self: auto;
          margin-right: 15px;
          box-sizing: border-box;
          height: 50px;
          
          line-height: 50px;
          color: white;
          font-size: 15px;
          padding: 0 12px;
          border-radius: 4px;
          background-color: orange;
        }
      }
    }
    
    .history-orders {
      .history-order-item {
        margin-bottom: 5px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        
        .order-image {
          margin: 5px;
        }
          
        .order-info {
          // height: 100px;
          flex-grow: 1;
          margin-left: 10px;
          margin-right: 15px;
          
          .order-number {
            height: 50px;
            line-height: 50px;
            // font-size: 10px;
            overflow: hidden;
            border:  1px solid rgba(7,17,27,0.1);
            border-radius: 5px;
          }
          
          .order-date {
            overflow: hidden;
            height: 50px;
            line-height: 50px;
            font-size: 15px;
            border:  1px solid rgba(7,17,27,0.1);
          }
        }
        
        .order-price {          
          flex-grow: 0;
          margin-right: 15px;
          box-sizing: border-box;
          height: 50px;
          
          line-height: 50px;
          color: white;
          font-size: 15px;
          padding: 0 12px;
          border-radius: 4px;
          background: rgb(0, 160, 220);
        }
      }
    }
  }
}

</style>
