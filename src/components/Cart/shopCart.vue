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
            <ul class="dish-ul">
              <li v-show="dish.count > 0" class="dish" v-for="dish in dishsSelect" :key="dish.id">
                <div class="left-section">{{dish.name}}</div>
                <div class="right-section">
                  <div class="prices">￥{{dish.price * dish.count}}</div>
                  <div class="control-wrapper">
                    <cart-control :dish="dish" @update="shows"></cart-control>
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
            <img class="cart" src="../../assets/menu/cart.svg">
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
import BScroll from 'better-scroll'
import { Toast } from 'vux'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    CartControl,
    Toast
  },
  data () {
    return {
      show: false,
      showToast: false
    }
  },
  computed: {
    ...mapGetters({
      totalPrice: 'menu/totalPrice'
    }),
    listshow () {
      if (this.show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.shopWrapper, {
              startY: 0,
              click: true
            })
            this.scroll.minScrollY = 0
            this.scroll.on('scrollEnd', (payload) => {
              console.log(payload)
            })
            console.log('asdasd')
          } else {
            this.scroll.refresh()
          }
        })
      }
      return this.show
    },
    ...mapState({
      dishsSelect: state => state.menu.selectDishes
    })
  },
  methods: {
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
      this.$store.commit('menu/emptySelectedDish')
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>

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
  }
}

.list-mask{
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
  position: absolute;
  width: 100%;
  left: 0;
  top: 0px;
  z-index: -1;
  line-height: 20px;
  padding-bottom: 10px;
  background-color: rgba(246, 249, 255, 1);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0);
  transform: translate3d(0, -100%, 0);
  &.fold-enter-active, &.fold-leave-active {
    transition: all 0.2s linear;
  }
  &.fold-enter, &.fold-leave-active {
    transform: translate3d(0, 0, 0);
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
    width: 100%;
    max-height: 217px;
    overflow: hidden;
    .dish-ul {
      width: 95%;
    }
    .dish {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: rgba(255, 255, 255, 1);
      margin-top: 13px;
      margin-left: 2.5%;
      width: 100%;
      height: 50px;
      .left-section {
        margin-left: 19px;
        width: 50%;
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
    .dish-ul::after {
      content: '';
      height: 30px;
      display: block;
    }
  }
}
</style>
