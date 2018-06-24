<template>
  <div>
    <div class="cart-shop">
      <transition name="fold">
        <div v-show="show" class="shop-list">
          <div class="list-header">
            <div class="title">已选菜品</div>
            <div class="empty" @click.stop.prevent="empty">清空</div>
          </div>
          <div class="list-content" ref="shopWrapper">
            <ul class="food-ul">
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
            <img class="cart" src="/src/assets/menu/cart.svg">
          </div>
          <div class="price">￥{{totalPrice}}</div>
        </div>
        <div class="content-right">
          <button @click.stop.prevent="toPayment">下单</button>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-show="listshow" class="list-mask" @click.stop.prevent="closeList">
      </div>
    </transition>
    <toast v-model="showToast" type="text" :time="1000" position="middle">请先点餐~</toast>
  </div>
</template>

<script>
import CartControl from '../cart-control/cart-control'
// import data from './data.json'
import BScroll from 'better-scroll'
import { Toast } from 'vux'
import { mapState } from 'vuex'
export default {
  components: {
    CartControl,
    Toast
  },
  // created () {
  //   this.$nextTick(() => {
  //     this._initScroll()
  //   })
  // },
  data () {
    return {
      // foodsSelect: data,
      show: false,
      showToast: false
    }
  },
  computed: {
    totalPrice () {
      return this.$store.getters.totalPrice
    },
    listshow () {
      if (this.show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.shopWrapper, {
              // stopPropagation: true,
              startY: 0,
              click: true
            })
            this.scroll.minScrollY = 0
            this.scroll.on('scrollEnd', (payload) => {
              console.log(payload)
              // if (payload.y < 0) {
              //   this.scroll.minScrollY = 0
              //   this.scroll.y = 0
              //   console.log(this.scroll)
              // }
            })
            console.log('asdasd')
          } else {
            this.scroll.refresh()
            // this.scroll.scrollTo(0, 0)
            // this.scroll.minScrollY = 0
          }
        })
      }
      return this.show
    },
    ...mapState({
      foodsSelect: 'selectFoods'
    })
  },
  methods: {
    // _initScroll () {
    //   this.boxScroll = new BScroll(this.$refs.shopWrapper, {
    //     click: true
    //   })
    // },
    shows (target) {
      console.log(target)
    },
    showList () {
      if (this.totalPrice > 0) {
        this.show = !this.show
      }
      console.log('"show list"')
      console.log(this.scroll)
    },
    closeList () {
      this.show = false
      console.log('"close list"')
    },
    toPayment () {
      if (this.totalPrice > 0) {
        this.$router.push('/pay')
      } else {
        this.showToast = true
      }
    },
    empty () {
      for (let i = 0; i < this.foodsSelect.length; ++i) {
        while (this.foodsSelect[i].count > 0) {
          this.$store.commit('decreaseCart', {
            food: this.foodsSelect[i]
          })
        }
      }
      this.show = false
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
      .cart {
        position: relative;
        left: 9px;
        top: 10px;
        height: 28px;
        width: 28px;
      }
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
    // .disable {
    // }
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
  // max-height: 300px;
  top: 0px;
  z-index: -1;
  line-height: 20px;
  padding-bottom: 10px;
  background-color: rgba(246, 249, 255, 1);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0);
  transform: translate3d(0, -100%, 0);
  &.fold-enter-active, &.fold-leave-active {
    transition: all 0.3s linear;
  }
  &.fold-enter, &.fold-leave-active {
    transform: translate3d(0, 0, 0);
  }
  // &.fold-leave {
  // }
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
    max-height: 217px;
    overflow: hidden;
    .food {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: rgba(255, 255, 255, 1);
      margin-top: 13px;
      margin-left: 10px;
      margin-right: 10px;
      width: 355px;
      height: 50px;
      .left-section {
        margin-left: 19px;
        width: 40%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        height: 50px;
        line-height: 50px;
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
          height: 50px;
          line-height: 50px;
          margin-right: 20px;
          color: rgba(116, 177, 249, 1);
          font-size: 12px;
          font-weight: bold;
          text-align: left;
          font-family: Arial;
        }
        .control-wrapper {
          margin-top: 12px;
          margin-right: 23px;
        }
      }
    }
    .food-ul::after {
      content: '';
      height: 40px;
      display: block;
    }
  }
}
</style>
