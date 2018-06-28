<template>
  <div class="dish-item-inner">
    <div class="left">
      <div class="dish-img">
        <img :src="dish.img"/>
      </div>
    </div>

    <div class="right">
      <h2 class="dish-name">{{dish.name}}</h2>
      <p class="dish-description">{{dish.description}}</p>

      <div class="price-wrapper">
        ￥<span class="price">{{dish.price}}</span>
      </div>

      <div class="cart-control-wrapper">
        <cart-control :dish="dish" @update="update"></cart-control>
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
  data () {
    return {
      show: false
    }
  },
  props: {
    dish: {
      type: Object
    }
  },
  methods: {
    update (target) {
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
.dish-item-inner {
  overflow: hidden;
  display: flex;
  flex: auto;
  background-color: white;
  border-radius: 5px;
  .left {
    flex: 0 0 100px;

    .dish-img {
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

    .dish-name {
      margin-top: 14px;
      font-size: 15px;
      height: 23px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 60%;
      line-height: 17px;
    }

    .dish-description {
      font-size: 12px;
      color: rgb(147, 153, 159);
      line-height: 17px;
      height: 23px;
      margin-top: 2px;
      margin-right: 3px;
      width: 80%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price-wrapper {
      position: absolute;
      bottom: 10px;
      left: 10px;
      font-size: 12px;
      color:rgba(116, 177, 249, 1);
      .price {
        font-size: 16px;
      }
    }

    .cart-control-wrapper {
      position: absolute;
      right: 14px;
      bottom: 10px;
    }
  }
}
</style>
