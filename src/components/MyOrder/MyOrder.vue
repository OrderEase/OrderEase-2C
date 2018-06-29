<template>
  <div class="my-order-wrapper">
    <div class="my-order-header">
      <x-icon class="back" type="ios-arrow-left" size="25" @click="back"></x-icon>
      <span>订单</span>
    </div>
    <div class="order-tab-wrapper">
      <span class="order-tab" :class="showUnfinishedOrder ? 'order-tab-active' : ''" @click="unfinishedOrderTabClick">未完成订单</span>
      <span class="order-tab" :class="showFinishedOrder ? 'order-tab-active' : ''" @click="finishedOrderTabClick">已完成订单</span>
    </div>
    <div class="order-list-wrapper" ref="orderListWrapper">
      <div class="order-list">
        <div class="orders" v-show="showUnfinishedOrder" v-for="order in unfinishedOrders">
          <router-link :to="{ name: 'OrderDetails', params: { orderId: order.id } }">
            <div class="order-item">
              <div class="order-body">
                <img class="order-image" :src="restaurant.img">
                <div class="order-info">
                  <div class="restaurant-name">{{ restaurant.name }}</div>
                  <div class="order-date">下单时间: {{ order.payDate }}</div>
                  <div class="order-dishes-count">共{{ order.dishes.length }}件菜品</div>
                </div>            
              </div>
              <div class="order-price">
                实付<span>¥{{ order.due }}</span>
              </div>
            </div>
          </router-link>
        </div>
        <div class="orders" v-show="showFinishedOrder" v-for="order in finishedOrders">
          <router-link :to="{ name: 'OrderDetails', params: { orderId: order.id } }">
            <div class="order-item">
              <div class="order-body">
                <img class="order-image" :src="restaurant.img">
                <div class="order-info">
                  <div class="restaurant-name">{{ restaurant.name }}</div>
                  <div class="order-date">下单时间: {{ order.payDate }}</div>
                  <div class="order-dishes-count">共{{ order.dishes.length }}件菜品</div>
                </div>
              </div>
              <div class="order-price">
                实付<span>¥{{ order.due }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { Tab, ButtonTab, ButtonTabItem, XButton } from 'vux'
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      showUnfinishedOrder: true,
      showFinishedOrder: false
    }
  },
  components: {
    XButton,
    Tab,
    ButtonTab,
    ButtonTabItem
  },
  created () {
    this.$store.dispatch('order/getOrdersList')
  },
  computed: {
    ...mapState({
      restaurant: state => state.restaurant.restaurant
    }),
    ...mapGetters('order', {
      unfinishedOrders: 'unfinishedOrdersList',
      finishedOrders: 'finishedOrdersList'
    })
  },
  methods: {
    unfinishedOrderTabClick () {
      this.showUnfinishedOrder = true
      this.showFinishedOrder = false
    },
    finishedOrderTabClick () {
      this.showFinishedOrder = true
      this.showUnfinishedOrder = false
    },
    back () {
      this.$router.back(-1)
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.orderListWrapper, {
          scrollY: true,
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.my-order-wrapper {
  background-color: #F6F9FF;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  .my-order-header {
    height: 50px;
    display: flex;
    flex-shrink: 0;    
    font-size: 18px;
    text-align: center;
    position: relative;
    background-color: white;
    display: flex;
    justify-content: center;
    
    .back {
      align-self: center;
      position: absolute;
      left: 2%;
      padding-bottom: 2px;
    }
    span {
      align-self: center;      
    }
  }
  
  .order-tab-wrapper {
    flex-shrink: 0;
    height: 40px;
    line-height: 40px;
    margin: 20px 20px 15px 20px;
    border-radius: 5px;
    display: flex;
    overflow: hidden;
    text-align: center;
    
    .order-tab {
      color: #777A83;
      background-color: #ECF0F9;
      width: 100%;
    }
    
    .order-tab-active {
      color: #FFFFFF;
      background-color: #539EF9;
      width: 100%;
    }
  }
  
  .order-list-wrapper {
    overflow: hidden;
    flex-grow: 1;
    margin: 0 20px;
    overflow: hidden;
    font-size: 12px;
    
    .order-list::after {
      content: '';
      display: block;
      height: 20px;
    }
    
    .order-list {
      .orders {
        .order-item {
          height: 120px;
          margin-bottom: 15px;
          background-color: white;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          
          .order-body {
            display: flex;
            
            .order-image {
              margin-left: 10px;
              margin-top: 15px;
              height: 70px;
              width: 80px;
              border-radius: 5px;
            }
            
            .order-info {
              color: #747881;
              margin-left: 10px;
              margin-top: 15px;
              font-size: 13px;
              
              .restaurant-name {
                font-size: 15px;
                font-weight: bold;
                color: black;
              }
              
              .order-date {
                margin-top: 10px;
              }         
            }
          }
          
          .order-price {
            vertical-align: middle;
            align-self: flex-end;
            color: #747881;
            margin-right: 10px;
            margin-bottom: 5px;
            
            span {
              vertical-align: middle;
              margin-left: 2px;
              color: #4D4D4E;
              font-size: 17px;
              font-weight: bold;
            }
          }          
        }
      }
    }
  }
}
</style>
