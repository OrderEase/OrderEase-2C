<template>
  <div>
    <div class="cart-shop">
      <transition name="fold">
        <div v-show="show" class="shop-list" >
          <div class="list-header">
            <div class="title">已选菜品</div>
            <div class="empty">清空</div>
          </div>
          <div class="list-content">
            <ul>
              <li v-show="food.count > 0" class="food" v-for="food in foodsSelect" :key="food.id">
                <div class="left-section">{{food.name}}</div>
                <div class="right-section">
                  <div class="prices">￥{{food.price * food.count}}</div>
                  <div class="control-wrapper">
                    <cart-control :food="food" @update="shows"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <div class="contents" @click.stop.prevent="showList">
        <div class="content-left">
          <div class="icon">
            <img>
          </div>
          <div class="price">￥{{totalPrice}}</div>
        </div>
        <div class="content-right">
          <button>下单</button>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-show="show" class="list-mask" @click.stop.prevent="closeList">
      </div>
    </transition>
  </div>
</template>

<script>
import CartControl from '../cart-control/cart-control'
// import data from './data.json'
import { mapState } from 'vuex'
export default {
  components: {
    CartControl
  },
  data () {
    return {
      // foodsSelect: data,
      show: true
    }
  },
  computed: {
    totalPrice () {
      let sum = 0
      for (let i = 0; i < this.foodsSelect.length; ++i) {
        sum += this.foodsSelect[i].price * this.foodsSelect[i].count
      }
      return sum
    },
    ...mapState({
      foodsSelect: 'selectFoods'
    })
  },
  methods: {
    shows (target) {
      console.log(target)
    },
    showList () {
      this.show = !this.show
      console.log('"show list"')
    },
    closeList () {
      this.show = false
      console.log('"close list"')
    }
  }
}
</script>

<style lang="scss" scoped>

// .cart-wrapper {
//   position: fixed;
//   // bottom: 43px;
//   width: 100%;
// }

.cart-shop {
  position: fixed;
  left: 0;
  bottom: 0px;
  z-index: 50;
  width: 100%;
  height: 43px;
}

.contents {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgb(124, 124, 124);
  // margin-top: 10px;
  opacity: 0.95;
  height: 43px;
  .content-left {
    display: flex;
    flex-direction: row;
    .icon {
      height: 45px;
      width: 45px;
      margin-left: 15px;
      margin-top: -6px;
      border-radius: 50%;
      background-color: rgba(83, 158, 249, 1);
    }
    .price {
      color: white;
      text-align: center;
      font-weight: bold;
      margin-left: 5px;
      line-height: 43px;
    }
  }
  .content-right {
    button {
      height: 43px;
      width: 112px;
      font-size: 16px;
      font-weight: bold;
      color: white;
      background-color: rgba(83, 158, 249, 1);
      border-width: 0px;
    }
  }
}

.list-mask{
  // height: 300px;
  // background-color: rgba(90, 90, 90, 1);
  // opacity: 0.58;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);
  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.5s;
  }
  &.fade-enter, &.fade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}

.shop-list {
  // display: flex;
  // flex-direction: column;
  position: absolute;
  width: 100%;
  left: 0;
  margin: 0px;
  bottom: 43px;
  z-index: -1;
  line-height: 20px;
  padding-bottom: 10px;
  background-color: rgba(246, 249, 255, 1);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0);
  &.fold-enter-active, &.fold-leave-active {
    transition: all 0.5s linear;
  }
  &.fold-enter, &.fold-leave-active {
    transform: translate3d(0, 0, 0);
  }
  &.fold-leave {
    transform: translate3d(0, -100%, 0);
  }
  .list-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .title {
      margin-top: 8px;
      margin-left: 16px;
      width: 58px;
      height: 21px;
      line-height: 20px;
      color: rgba(87, 87, 87, 1);
      font-size: 14px;
      text-align: center;
      font-family: Arial;
    }
    .empty {
      margin-right: 15px;
      margin-top: 6px;
      width: 25px;
      height: 23px;
      line-height: 17px;
      color: rgba(16, 16, 16, 1);
      font-size: 12px;
      text-align: center;
      font-family: Arial;
    }
  }
  .list-content {
    width: 375px;
    .food {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: rgba(255, 255, 255, 1);
      margin-top: 13px;
      margin-left: 10px;
      margin-right: 10px;
      width: 355px;
      height: 40px;
      .left-section {
        margin-left: 19px;
        width: 57px;
        height: 40px;
        line-height: 40px;
        color: rgba(16, 16, 16, 1);
        font-size: 14px;
        text-align: left;
        font-family: Arial;
      }
      .right-section {
        display: flex;
        flex-direction: row;
        .prices {
          width: 36px;
          height: 40px;
          margin-right: 20px;
          line-height: 40px;
          color: rgba(116, 177, 249, 1);
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          font-family: Arial;
        }
        .control-wrapper {
          margin-top: 10px;
          margin-right: 23px;
        }
      }
    }
  }
}
</style>
