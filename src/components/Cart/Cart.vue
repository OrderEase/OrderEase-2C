
<template>
  <div>
    <div class="cart-wrapper" ref="cartWrapper">
      <transition-group tag="ul" name="food-order">
        <li v-for="cart in orders" class="cart-item" :key="cart.id" v-if="cart.num >= 0">
          <div class="cart-top">
            <div class="cart-img">
              <img :src="cart.icon"/>
            </div>
            <div class="cart-info">
              <h2>{{cart.name}}</h2>
              <div class="cart-price-wrapper">
                <span>单价:</span>
                <span class="cart_price price">￥{{cart.price}}</span>
              </div>
            </div>
            <div class="third">
              <div class="total-price">
                <span>总价:</span>
                <span class="price" >￥{{cart.price * cart.num}}</span>
              </div>
              <div class="add" v-on:click="check(cart.id)">
                <inline-x-number class="add-inline-number" width="25px" :min="-1" v-model="cart.num"></inline-x-number>
              </div>
            </div>
          </div>
        </li>
      </transition-group>
    </div> 
    <div class="top-components">
        <div class="sum"><span>总价格:</span><span class="price">￥{{getSum}}</span></div>
        <x-button class="submit" @click.native="submit" :disabled="getSum === 0 ? true : false" type="primary">下单</x-button>        
    </div>
  </div>
</template>

<script>
import {XButton, InlineXNumber, XHeader} from 'vux'
import BScroll from 'better-scroll'
// import orderdata from './data.json'
export default {
  components: {
    XButton,
    InlineXNumber,
    XHeader
  },
  data () {
    return {
      orders: this.$store.state.orders,
      listHeight: [],
      cartsScrollY: 0
    }
  },
  created () {
    console.log('create', this.$store.state.orders)
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  computed: {
    getSum: function () {
      let sum = 0
      if (typeof this.orders === 'undefined') {
        return 0
      }
      for (let i = 0; i < this.orders.length; i = i + 1) {
        sum = sum + this.orders[i].price * this.orders[i].num
      }
      console.log(sum)
      return sum
    }
  },
  methods: {
    _initScroll () {
      this.boxScroll = new BScroll(this.$refs.cartWrapper, {
        click: true
      })
    },
    check (id) {
      this.$nextTick(function () {
        let i = 0
        if (typeof this.orders === 'undefined') {
          return 0
        }
        for (; i < this.orders.length; ++i) {
          if (this.orders[i].num === -1) {
            while (i < this.orders.length - 1) {
              this.orders[i] = this.orders[i + 1]
              i = i + 1
            }
            this.orders.pop()
          }
        }
        console.log(this.orders)
      })
      this.$store.commit('check', {
        id: id
      })
      console.log('success')
    },
    submit () {
      console.log('submit sucess')
      this.$router.push({name: 'Pay', params: {money: this.getSum}})
    }
  }
}
</script>

<style lang="scss">

.food-order-enter-active {
  transition: all .3s ease;
}

.food-order-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.food-order-enter, .food-order-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

.total-price, .cart-price-wrapper {
  font-size: 14px;
}

.price {
  color: red;
}

.top-components {
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  bottom: 0px;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  padding-bottom: 5px;
  margin-bottom: 50px;
  .sum {
    text-align: center;
    flex: 0 0 100px;
    padding-top: 15px;
    margin-left: 30px;
  }
  .submit {
    margin-top: 5px;
    margin-right: 30px;
    width: 150px;
  }
}



.cart-wrapper {
  overflow: hidden;
  position: absolute;
  bottom: 110px;
  top: 10px;
  width: 100%;
  .cart-item {
    padding: 10px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    margin-left: 20px;
    margin-right: 20px;
    list-style-type: none;
    .cart-top {
      justify-content: space-around;
      display: flex;
      flex-direction: row;
      .cart-img {
        flex: 0 0 100px;
        width: 120px;
        padding: 10px 20px 0px 0px;
        img {
          width: 100px;
          height: 62px;
        }
      }

      .cart-info {
        flex: 1;
        width: 100px;
        padding: 10px 0px 0px 0px;
        margin-right: -20px;
        h2 {
          font-size: 14px;
        }

        .cart-price-wrapper {
          margin-top: 20px;
        }

      }

      .third {
        flex: 1 0;
        padding: 10px 0px 0px 0px;
        .add {
          margin-top: 20px;
          
        }
      }
    }
  }
}
</style>
