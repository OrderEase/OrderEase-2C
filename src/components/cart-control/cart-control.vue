<template>
  <div class="cart-control">
    <transition name="fade">
      <span class="cart-minus" v-show="food.count > 0" @click.stop.prevent="decreaseCart($event)">-</span>
    </transition>
    
    <span class="cart-count" v-show="food.count > 0">{{food.count}}</span>
    <span class="cart-plus" @click.stop.prevent="increaseCart($event)">+</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      increaseCart (event) {
        if (!event._constructed) {
          // 去掉自带click事件的点击
          return
        }

        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }

        this.$emit('update', event.target)
      },
      decreaseCart (event) {
        if (!event._constructed) {
          // 去掉自带click事件的点击
          return
        }
        this.food.count--

        this.$emit('update', event.target)
      }
    }
  }
</script>

<style lang="scss">
  .cart-control {
    .cart-count {
      display: inline-block;
      width: 15px;
      padding-right: 1px;
      color: rgb(58, 59, 59);
      text-align: center;
    }

    .cart-minus {
      color: rgba(18, 124, 245, 0.5);
      background-color: white;
      border: 1px solid rgba(18, 124, 245, 0.5);
    }

    .cart-plus {
      color: white;
      background-color: rgba(83, 158, 249, 1);
    }

    .cart-minus, .cart-plus {
      display: inline-block;
      height: 14px;
      width: 14px;
      border-radius: 50%;
      text-align: center;
      font-size: 15px;
      line-height: 13px;

      &.fade-enter-active, &.fade-leave-active {
        transition: all 0.4s linear;
      }
      &.fade-enter, &.fade-leave-active {
        opacity: 0;
        transform: translate3d(24px, 0, 0);
      }
    }
  }
</style>
