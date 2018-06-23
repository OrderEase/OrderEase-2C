<template>
  <div class="food-item-inner">
    <div class="left">
      <div class="food-img">
        <img :src="food.img"/>
      </div>
    </div>

    <div class="right">
      <h2 class="food-name">{{food.name}}</h2>
      <p class="food-description">{{food.description}}</p>

      <div class="price-wrapper">
        <span class="price"><span class="unit">￥</span>{{food.price}}</span>
      </div>

      <!-- <div class="like-wrapper">
        <img class="like-icon" src="../../assets/menu/good.png">
        <span class="like">{{food.like}}</span>
      </div> -->

      <div class="cart-control-wrapper">
        <cart-control :food="food" @update="update"></cart-control>
      </div>
    </div>
    <!-- <food-detail :food="food" :show="show" /> -->
  </div>
</template>

<script>
import CartControl from '../cart-control/cart-control'
// import FoodDetail from './FoodDetail/food-detail'

export default {
  components: {
    CartControl
    // FoodDetail
  },
  data () {
    return {
      show: false
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    update (target) {
      // console.log(1)
      this.$emit('update', target)
    },
    showDialog () {
      console.log('show dialog')
      this.show = true
    }
  }
}
</script>

<style lang="scss">
.food-item-inner {
  overflow: hidden;
  display: flex;
  flex: auto;
  background-color: white;
  border-radius: 5px;
  .left {
    flex: 0 0 100px;

    .food-img {
      margin-top: 14px;
      margin-left: 14px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5%;
        border-color: white;
      }
      width: 84px;
      height: 70px;
    }
  }

  .right {
    padding-left: 10px;
    position: relative;
    overflow: hidden;
    flex: 1;

    .food-name {
      margin-top: 14px;
      font-size: 12px;
      height: 23px;
      line-height: 17px;
    }

    .food-description {
      font-size: 12px;
      color: rgb(147, 153, 159);
      line-height: 17px;
      height: 23px;
      margin-top: 2px;
      margin-right: 3px;
      width: 150px;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .price-wrapper {
      position: absolute;
      bottom: 12px;
      left: 10px;
      font-size: 12px;
      .price {
        color:rgba(116, 177, 249, 1);
      }
    }

    // .like-wrapper {
    //   display: inline-block;
    //   position: absolute;
    //   bottom: 4px;
    //   left: 60px;
      
    //   .like-icon {
    //     height: 14px;
    //     width: 14px;
    //   }
    // }

    .cart-control-wrapper {
      position: absolute;
      right: 14px;
      bottom: 10px;
    }
  }
}
</style>
