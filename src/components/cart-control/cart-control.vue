<template>
  <div class="cart-control">
    <transition name="fade">
      <span class="cart-minus" v-show="food.count > 0" @click.stop.prevent="decreaseCart($event)">
        <img src="/src/assets/menu/minus-icon.svg" alt="" style="height: 24px; width: 24px;">
      </span>
    </transition>
    
    <span class="cart-count" v-show="food.count > 0">{{food.count}}</span>
    <span class="cart-plus" @click.stop.prevent="increaseCart($event)">
      <img src="/src/assets/menu/plus-icon.svg" alt="" style="height: 24px; width: 24px;">
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  // import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      increaseCart (event) {
        console.log('asdasd')
        // if (!event._constructed) {
        //   // 去掉自带click事件的点击
        //   return
        // }
        this.$store.commit('increaseCart', {
          food: this.food
        })
        // if (!this.food.count) {
        //   Vue.set(this.food, 'count', 1)
        // } else {
        //   this.food.count++
        // }
        console.log('"add"', this.food.count > 0)
        this.$emit('update', event.target)
      },
      decreaseCart (event) {
        // if (!event._constructed) {
        //   // 去掉自带click事件的点击
        //   return
        // }
        this.$store.commit('decreaseCart', {
          food: this.food
        })
        // this.food.count--
        console.log('"delete"')
        this.$emit('update', event.target)
      }
    }
  }
</script>

<style lang="scss">
  .cart-control {
    margin-right: 3px;
    .cart-count {
      position: relative;
      top: 3px;
      left: 2px;
      display: inline-block;
      width: 16px;
      color: rgb(58, 59, 59);
      text-align: center;
    }

    .cart-minus, .cart-plus {
      display: inline-block;
      vertical-align: middle;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      text-align: center;
      font-size: 20px;
      line-height: 15px;

      &.fade-enter-active, &.fade-leave-active {
        transition: all 0.3s linear;
      }
      &.fade-enter, &.fade-leave-active {
        opacity: 0;
        transform: translate3d(24px, 0, 0);
      }
    }

    .cart-plus {
      position: relative;
      z-index: 2;
    }
    .cart-minus {
      position: relative;
      top: 0px;
      z-index: 1;
    }
  }
</style>
