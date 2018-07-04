<template lang="html">
  <div class="pay-wrapper">
    <div v-transfer-dom>
      <popup v-model="showPayMethodSelection" 
             @on-show="currentCheckPayMethod = currentPayMethod"
             @on-first-show="currentCheckPayMethod = currentPayMethod"
             height="50%" style="overflow-y: hidden">
        <div class="pay-method-selection-container">
          <div class="pay-method-selection-header">
            <x-icon class="close" type="ios-close-empty" size="30" @click="closePayMethodSelection"></x-icon>
            <span>选择支付方式</span>
            <x-icon class="confirm" type="ios-checkmark-empty" size="30" @click="confirmPayMethodSelection"></x-icon>
          </div>
          <div class="pay-method-item" 
              :class="payMethod.name == currentCheckPayMethod ? 'pay-method-item-active' : ''" 
               v-for="payMethod in payMethods"
              @click="selectPayMethod(payMethod.name)">
            <img class="pay-method-icon" :src="payMethod.icon" >
            <span class="pay-method-name">{{ payMethod.name }}</span>
            <check-icon :value.sync="payMethod.name == currentCheckPayMethod" class="pay-method-checker"></check-icon>
          </div>
        </div>
      </popup>
    </div>
    <div class="pay-header">
      <x-icon class="back" type="ios-arrow-left" size="25" @click="back"></x-icon>
      <span>支付</span>
    </div>
    <div class="pay-details-wrapper" ref="payDetailsWrapper">
      <div class="pay-details">
        <div class="pay-method-picker" @click="showPayMethodSelection=true">
          <span class="pay-method">{{ currentPayMethod }}</span>
          <span class="pay-hint">更换支付方式 ></span>
        </div>
        <div class="pay-order-info">
          <divider class="pay-order-header">{{ restaurantName }}</divider>
          <div class="dish-item" v-for="dish in dishes" v-show="dish.count > 0">
            <img class="dish-image" :src="dish.img">
            <div class="dish-name">{{ dish.name }}</div>
            <div class="dish-count">x{{ dish.count }}</div>
          <div class="dish-price">¥<span>{{ dish.price }}</span></div>
        </div>
        <div class="total-price-container">
          <div class="discount" v-show="this.totalPrice != this.due">
            已优惠¥{{ totalPrice - due }}
          </div>
          <div class="total-price">
            小计 <span>¥{{ due }}</span>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="pay-bar">
      <span class="total-price">¥{{ due }}</span>
      <span class="original-price" v-show="this.totalPrice != this.due">¥{{ totalPrice }}</span>
      <span class="pay-confirm" @click="pay">确认支付</span>
    </div>  
    <toast v-model="confirmPayment" :type="paymentSuccess ? 'success' : 'cancel'" width="9em" :text="confirmPaymentHint" :time="1000"></toast>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {Toast, Divider, Checklist, Popup, TransferDom, CheckIcon} from 'vux'
import { mapState, mapGetters } from 'vuex'

export default {
  directives: {
    TransferDom
  },
  components: {
    Divider,
    Checklist,
    CheckIcon,
    Popup,
    Toast
  },
  methods: {
    closePayMethodSelection () {
      this.showPayMethodSelection = false
    },
    confirmPayMethodSelection () {
      this.$store.commit('user/changePayMethod', {
        payMethod: this.currentCheckPayMethod
      })
      this.showPayMethodSelection = false
    },
    selectPayMethod (payMethod) {
      this.currentCheckPayMethod = payMethod
    },
    back () {
      this.$store.dispatch('order/deleteOrder')
      this.$router.back(-1)
    },
    async pay () {
      if (this.isPaid) {
        console.log('already paid')
        return
      }
      this.isPaid = true
      console.log('pay id ', this.getPayId())
      let payInfo = {
        'payId': this.getPayId(),
        'payWay': this.currentPayMethod
      }
      await this.$store.dispatch('order/payOrder', payInfo)
      this.confirmPayment = true
      setTimeout(() => {
        this.$store.commit('menu/emptySelectedDish')
        this.$store.dispatch('order/getOrdersList')
        this.$router.push('menu')
      }, 1500)
    },
    getPayId () {
      let currentDate = new Date()
      return currentDate.getTime()
    },
    calculateDue () {
      console.log('calculateDue')
      let bestDue = this.totalPrice
      // for each promotion
      for (let i in this.promotions) {
        let promotion = this.promotions[i]
        // for each rule in current promotion
        for (let j in promotion.rules) {
          let rule = promotion.rules[j]
          if (this.totalPrice < rule.requirement) {
            continue
          }
          let currentDue = 0
          if (rule.mode === 1) {
            currentDue = this.totalPrice - rule.discount
          } else if (rule.mode === 2) {
            currentDue = this.totalPrice * rule.discount
          }
          if (currentDue < bestDue) {
            bestDue = currentDue
          }
        }
      }
      console.log('promotions ', this.promotions)
      console.log('bestDue ', bestDue)
      this.due = bestDue
    }
  },
  data () {
    return {
      isPaid: false,
      due: this.totalPrice,
      showPayMethodSelection: false,
      currentCheckPayMethod: '微信支付',
      confirmPayment: false,
      payMethods: [
        {id: 0, name: '微信支付', icon: require('../../assets/pay/微信支付.svg')},
        {id: 1, name: '支付宝', icon: require('../../assets/pay/支付宝支付.svg')},
        {id: 2, name: '银行卡支付', icon: require('../../assets/pay/银行卡支付.svg')},
        {id: 3, name: '比特币', icon: require('../../assets/pay/比特币.svg')}
      ]
    }
  },
  created () {
    console.log('Pay created')
    let content = []
    this.calculateDue()
    for (let i in this.dishes) {
      content.push({ 'dish': this.dishes[i].id, 'quantity': this.dishes[i].count })
    }
    let orderInfo = {
      'tableId': this.$store.state.user.tableId,
      'total': this.totalPrice,
      'due': this.due,
      'content': content
    }
    console.log('orderInfo ', orderInfo)
    this.$store.dispatch('order/placeOrder', orderInfo)
  },
  computed: {
    confirmPaymentHint () {
      if (!this.paymentSuccess) {
        return '支付失败'
      }
      return '支付成功'
    },
    ...mapState({
      dishes: state => state.menu.selectDishes,
      paymentSuccess: state => state.order.paymentSuccess,
      restaurantName: state => state.restaurant.restaurant.name,
      currentPayMethod: state => state.user.payMethod,
      promotions: state => state.promotion.promotionsRawData
    }),
    ...mapGetters({
      totalPrice: 'menu/totalPrice'
    })
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.payDetailsWrapper, {
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
.pay-method-selection-container {
  background-color: #F6F9FF;
  height: 100%;
  .pay-method-selection-header {
    height: 10%;
    display: flex;
    justify-content: center;
    flex-shrink: 0;    
    font-size: 16px;
    text-align: center;
    position: relative;
    margin-bottom: 10px;
    padding-top: 8px;
    .close {
      align-self: center;
      position: absolute;
      left: 15px;
    }
    .confirm {
      align-self: center;
      position: absolute;
      right: 15px;
    }
    span {
      align-self: center;     
    }
  }
  .pay-method-item-active {
    box-shadow: 0px 5px 16px 0px #F0F0F0;
  }
  
  .pay-method-item {
    display: flex;
    justify-content: space-between;
    background-color: white;
    margin: 15px;
    border-radius: 5px;
    height: 15%;
    .pay-method-icon {
      margin: 0 10px;
      height: 60%;
      width: 10%;
      align-self: center;
    }
    .pay-method-name {
      flex-grow: 1;
      font-size: 15px;
      align-self: center;
    }
    .pay-method-checker {
      align-self: center;
      margin-right: 5px;
    }
  }
}

.pay-wrapper {
  background-color: #F6F9FF;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  .pay-header {
    height: 50px;
    display: flex;
    justify-content: center;
    flex-shrink: 0;    
    font-size: 18px;
    text-align: center;
    position: relative;
    background-color: white;
    
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
  
  .pay-details-wrapper {
    margin: 0 20px;
    padding-top: 20px;
    flex-grow: 1;
    overflow: hidden;
    
    .pay-details::after {
      content: '';
      display: block;
      height: 95px;
    }
    
    .pay-method-picker {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      // margin-top: 20px;
      margin-bottom: 15px;
      padding: 0px 20px;
      background-color: white;
      border-radius: 5px;
      
      .pay-method {
        color: #101010;
        font-size: 15px;
      }
      .pay-hint {
        color: #7F7F7F;
        font-size: 13px;
      }
    }
    
    .pay-order-info {
      background-color: white;
      border-radius: 5px;
      padding: 15px 20px 0 20px;
      
      .pay-order-header {
        font-size: 14px;
        color: #101010;
        padding: 0px;
      }
      
      .dish-item {
        padding: 15px 0;
        display: flex;
        font-size: 12px;
        align-items: center;
        border-bottom: 1px dotted #EBEBEB;
        
        .dish-image {
          height: 40px;
          width: 40px;
          border-radius: 5px;
        }
        
        .dish-name {
          width: 40%;
          margin-left: 10px;
          letter-spacing: 0.5px;
          color: #1C1D25;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        
        .dish-count {
          width: 40%;
          text-align: center;
          font-size: 14px;
          color: #747881;
        }  
        
        .dish-price {
          width: 20%;
          text-align: right;
          color: #101010;
          font-size: 14px;
          
          span {
            margin-left: 1.5px;
            font-size: 18px;
          }
        }
      }
      
      .total-price-container {
        height: 30px;
        padding: 10px 0;
        font-size: 12px;
        display: flex;
        justify-content: flex-end;
        
        .discount {
          align-self: center;
          margin-right: 10px;
          padding-bottom: 1px;
          color: #747881;
        }
                
        .total-price {
          align-self: center;
          font-size: 14px;
          color: #101010;
          
          span {
            color: #323232;
            font-weight: bold;
            font-size: 18px;
            vertical-align: middle;
          }          
        }
      }               
    }
    
  }
  
  .pay-bar {
    height: 45px;
    width: 100%;
    position: fixed;
    bottom: 0px;
    background-color: #7C7C7C;
    color: white;
    line-height: 45px;
    opacity: 0.95;
    
    .total-price {
      font-weight: bold;
      font-size: 20px;
      margin-left: 10px;
    }
    
    .original-price {
      color: #CECECE;
      font-size: 14px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    
    .pay-confirm {
      text-align: center;
      width: 30%;
      font-size: 16px;
      position: absolute;
      right: 0px;
      background-color: #539EF9;
    }
  }
}
</style>
