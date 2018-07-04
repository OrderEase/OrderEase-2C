<template>
  <div class="cart-control">
    <transition name="fade">
      <span class="cart-minus" v-show="dish.count > 0" @click.stop.prevent="decreaseCart($event)">
        <img src="../../assets/menu/minus-icon.svg" alt="" style="height: 24px; width: 24px;">
      </span>
    </transition>
    
    <span class="cart-count" v-show="dish.count > 0">{{dish.count}}</span>
    <span class="cart-plus" @click.stop.prevent="increaseCart($event)">
      <img src="../../assets/menu/plus-icon.svg" alt="" style="height: 24px; width: 24px;">
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      dish: {
        type: Object
      }
    },
    methods: {
      increaseCart (event) {
        console.log('asdasd')
        this.$store.commit('menu/increaseCart', {
          dish: this.dish
        })
      },
      decreaseCart (event) {
        this.$store.commit('menu/decreaseCart', {
          dish: this.dish
        })
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
