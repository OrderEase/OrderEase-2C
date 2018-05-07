<template>
    <transition name="move">
      <div class="order-wrapper" ref="orderWrapper">
        <div class="order-details">
          <div class="back">
            <x-icon type="ios-arrow-left" size="30"></x-icon>
          </div>
          <div class="order-date">
            下单日期: {{ order.date }}
          </div>
          <!-- <divider>df</divider> -->
          <div class="food-list" v-for="food in foods">
            <div class="food-item">
              <img class="food-image" :src="food.img">
              <span class="food-name">{{ food.name }}</span>
              <span class="food-price">¥{{ food.price }}</span>
              <span class="food-amount">{{ food.amount }}份</span>
              <!-- <span class="waiting-time"></span> -->
              <span class="food-total-price"> {{ food.price * food.amount }}</span>
              <x-button mini>催单</x-button>
              <x-circle
                class="waiting-time"
                :percent="percent"
                :stroke-width="5"
                stroke-color="#04BE02"
                anticlockwise>
                <span>{{ percent }}%</span>
              </x-circle>
            </div>
          </div>
          <div class="pay-bar">
            <span class="total-price">合计金额: {{ totalPrice }}</span>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
import BScroll from 'better-scroll'
import { XButton, XCircle, Divider } from 'vux'

// let totalPrice = 0

export default {
  data () {
    return {
      percent: 50,
      order: {
        date: '2018-5-6'
      },
      foods: [
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          name: '皮蛋瘦肉粥',
          price: 10,
          amount: 3
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          name: '皮蛋粥',
          price: 5,
          amount: 5
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          name: '瘦肉粥',
          price: 8,
          amount: 4
        }
      ]
    }
  },

  components: {
    XButton,
    XCircle,
    Divider
  },

  computed: {
    totalPrice: function () {
      let total = 0
      for (let i in this.foods) {
        // console.log(food)
        let price = this.foods[i].price
        let amount = this.foods[i].amount
        total += price * amount
      }
      return total
    }
  },

  methods: {
    // onItemClick (index) {
    //   console.log('on item click:', index)
    // }
  },

  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.orderWrapper, {
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
  
  .order-details {
    .back {
      // position: absolute;
      // top: 12px;
      // left: 6px;
      // font-size: 20px;
      padding: 10px;
      // fill: white;
    }
    
    .food-list {
      .food-item {
        margin-bottom: 5px;
        background-color: white;
        display: flex;
        align-items: center;
        // justify-content: space-between;
        
        .food-image {
          height: 100px;
          width: 100px;
        }
        
        .waiting-time {
          width: 50px;
          height: 50px;
        }
      }
    }
  }
}

</style>
