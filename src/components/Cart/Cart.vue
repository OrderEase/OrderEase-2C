
<template>
  <div>
    <ul>
      <li v-for="food in orders" class="food-item" :key="food.id">
        <div class="top">
          <div class="food-img">
            <img :src="food.icon"/>
          </div>
          <div class="food-info">
            <h2>{{food.name}}</h2>
            <div class="price-wrapper">
              <span class="price"><span class="unit">￥</span>{{food.price}}</span>
            </div>
          </div>
          <div>{{food.price * food.num}}</div>
        </div>
        <div class="bottom">
          <div class="quantity">
            <inline-x-number width="50px" :min="0"></inline-x-number>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {XButton, InlineXNumber} from 'vux'
import orderdata from './data.json'
export default {
  components: {
    XButton,
    InlineXNumber
  },
  data () {
    return {
      orders: orderdata
    }
  },
  created () {
    {
      console.log(this.orders.length)
      let i = 0
      for (; i < this.orders.length; i = i + 1) {
        console.log(i)
      }
    }
  }
}
</script>

<style>
.food-item {
  padding: 10px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  overflow: hidden;

  .top {
    // height: 100px;
    display: flex;

    .food-img {
      width: 100px;
      float: left;
      flex: 0 0 100px;

      img {
        width: 80px;
        height: 62px;
      }
    }

    .food-info {
      float: left;
      flex: 1;

      h2 {
        font-size: 14px;
      }

      .price-wrapper {
        margin-top: 3px;
        float: left;

        .price {
          color: #f01414;
        }
      }

    }
  }

  .bottom {
    .quantity {
      display: inline-block;
      margin-left: 5px;

      .vux-inline-x-number {
        height: 20px !important;
      }
    }
  }
}
</style>
