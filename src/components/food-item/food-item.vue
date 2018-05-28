<template>
  <div class="food-item-inner">
    <div class="left">
      <div class="food-img">
        <img :src="food.icon"/>
      </div>
    </div>

    <div class="right">
      <h2 class="food-name">{{food.name}}</h2>
      <p class="food-discription">{{food.discription}}</p>

      <div class="price-wrapper">
        <span class="price"><span class="unit">￥</span>{{food.price}}</span>
      </div>

      <div class="like-wrapper">
        <img class="like-icon" src="../../assets/menu/good.png">
        <span class="like">{{food.like}}</span>
      </div>

      <div class="cart-control-wrapper">
        <cart-control :food="food" @update="update"></cart-control>
      </div>
    </div>
  </div>
</template>

<script>
import CartControl from '../cart-control/cart-control'

export default {
  components: {
    CartControl
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
    }
  }
}
</script>

<style lang="scss">
.food-item-inner {
  overflow: hidden;
  display: flex;
  flex: auto;

  .left {
    flex: 0 0 100px;

    .food-img {
      img {
        width: 100px;
        height: 80px;
      }
    }
  }

  .right {
    padding-left: 10px;
    position: relative;
    overflow: hidden;
    flex: 1;

    .food-name {
      font-size: 15px;
    }

    .food-discription {
      font-size: 14px;
      color: rgb(147, 153, 159);
      line-height: 14px;
      margin-top: 2px;
      width: 160px;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .price-wrapper {
      margin-top: 10px;
      position: absolute;
      bottom: 4px;
      left: 10px;

      .price {
        color: #f01414;
      }
    }

    .like-wrapper {
      display: inline-block;
      position: absolute;
      bottom: 4px;
      left: 60px;
      
      .like-icon {
        height: 14px;
        width: 14px;
      }
    }

    .cart-control-wrapper {
      position: absolute;
      right: 0;
      bottom: 4px;
    }
  }
}
</style>
