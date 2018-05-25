
<template>
  <div>
    <x-header title="购物车" :left-options="{showBack: false}"></x-header>
    <div class="cart-wrapper" ref="cartWrapper">
      <ul>
        <li v-for="cart in orders" class="cart-item" :key="cart.id">
          <div class="cart-top">
            <div class="cart-img">
              <img :src="cart.icon"/>
            </div>
            <div class="cart-info">
              <h2>{{cart.name}}</h2>
              <div class="cart-price-wrapper">
                <span class="cart_price"><span>￥</span>{{cart.price}}</span>
              </div>
            </div>
            <div class="third">
              <div class="total-price">
                <span>￥</span>{{cart.price * cart.num}}
              </div>
              <div class="add" v-on:click="check">
                <inline-x-number width="50px" :min="0" v-model="cart.num"></inline-x-number>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div> 
    <div class="top-components">
        <div class="sum"><span>总价格:  {{getSum}}</span><span>￥</span></div>
        <x-button class="submit" @click.native="submit" :disabled="getSum === 0 ? true : false" type="primary">下单</x-button>        
    </div>
  </div>
</template>

<script>
import {XButton, InlineXNumber, XHeader} from 'vux'
import BScroll from 'better-scroll'
import orderdata from './data.json'
export default {
  components: {
    XButton,
    InlineXNumber,
    XHeader
  },
  data () {
    return {
      orders: orderdata,
      listHeight: [],
      cartsScrollY: 0
    }
  },
  created () {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  computed: {
    getSum: function () {
      let sum = 0
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
    check () {
      this.$nextTick(function () {
        let i = 0
        for (; i < this.orders.length; ++i) {
          if (this.orders[i].num === 0) {
            while (i < this.orders.length - 1) {
              this.orders[i] = this.orders[i + 1]
              i = i + 1
            }
            this.orders.pop()
          }
        }
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
  top: 50px;
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
        width: 100px;
        img {
          width: 80px;
          height: 62px;
        }
      }

      .cart-info {
        flex: 1;
        width: 100px;
        h2 {
          font-size: 14px;
        }

        .cart-price-wrapper {
          margin-top: 20px;
        }

      }

      .third {
        flex: 1 0;
        
        .add {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
