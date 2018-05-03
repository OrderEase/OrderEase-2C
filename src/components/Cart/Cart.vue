
<template>
  <div class="cart-wrapper" ref="cartWrapper">
    <div class="top-components">
        <div class="sum"><span>总价格:</span>{{getSum}}<span>￥</span></div>
        <x-button class="submit">下单</x-button>        
    </div>
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
            <div class="add">
              <inline-x-number width="50px" :min="0" v-model="cart.num"></inline-x-number>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {XButton, InlineXNumber} from 'vux'
// import BScroll from 'better-scroll'
import orderdata from './data.json'
export default {
  components: {
    XButton,
    InlineXNumber
  },
  data () {
    return {
      orders: orderdata,
      listHeight: [],
      cartsScrollY: 0
    }
  },
  created () {
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
  }
}
</script>

<style lang="scss">



.cart-wrapper {
  .top-components {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    background: ;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    padding-bottom: 5px;
    .sum {
      text-align: center;
      flex: 0 0 100px;
      padding-top: 5px;
      margin-left: 10px;
      border: 2px solid rgba(7, 17, 27, 0.1);
    }
    .submit {
      margin-right: 10px;
      width: 150px;
    }
  }



  .cart-item {
    padding: 10px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    

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
