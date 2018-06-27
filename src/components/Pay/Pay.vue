<template lang="html">
  <div class="pay-wrapper">
    <div v-transfer-dom>
      <popup v-model="showPayMethodSelection" 
             @on-show="current_check_pay_method_id = current_pay_method_id"
             @on-first-show="current_check_pay_method_id = current_pay_method_id"
             height="50%" style="overflow-y: hidden">
        <div class="pay-method-selection-container">
          <div class="pay-method-selection-header">
            <x-icon class="close" type="ios-close-empty" size="30" @click="closePayMethodSelection"></x-icon>
            <span>选择支付方式</span>
            <x-icon class="confirm" type="ios-checkmark-empty" size="30" @click="confirmPayMethodSelection"></x-icon>
          </div>
          <div class="pay-method-item" 
              :class="pay_method.id == current_check_pay_method_id ? 'pay-method-item-active' : ''" 
               v-for="pay_method in pay_methods"
              @click="selectPayMethod(pay_method.id)">
            <img class="pay-method-icon" :src="pay_method.icon">
            <span class="pay-method-name">{{ pay_method.name }}</span>
            <check-icon :value.sync="pay_method.id == current_check_pay_method_id" class="pay-method-checker"></check-icon>
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
          <span class="pay-method">{{ current_pay_method }}</span>
          <span class="pay-hint">更换支付方式 ></span>
        </div>
        <div class="pay-order-info">
          <divider class="pay-order-header">{{ restaurantName }}</divider>
          <div class="dish-item" v-for="dish in dishes">
            <img class="dish-image" :src="dish.img">
            <div class="dish-name">{{ dish.name }}</div>
            <div class="dish-amount">x{{ dish.amount }}</div>
          <div class="dish-price">¥<span>{{ dish.price }}</span></div>
        </div>
        <div class="total-price-container">
          <div class="total-price">
            小计 <span>¥{{ totalPrice }}</span>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="pay-bar">
      <span class="total-price">¥{{ totalPrice }}</span>
      <span class="pay-confirm" @click="submitPayRequest">确认支付</span>
    </div>  
    <toast v-model="confirmPayment" width="9em" :text="confirmPaymentHint" :time="1000"></toast>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {Toast, Divider, Checklist, Popup, TransferDom, CheckIcon} from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    // Swiper,
    Divider,
    // XHeader,
    // CellBox,
    // Group,
    Checklist,
    CheckIcon,
    // XButton,
    Popup,
    Toast
  },
  created () {
  },
  methods: {
    closePayMethodSelection () {
      this.showPayMethodSelection = false
    },
    confirmPayMethodSelection () {
      this.current_pay_method_id = this.current_check_pay_method_id
      this.showPayMethodSelection = false
    },
    selectPayMethod (id) {
      this.current_check_pay_method_id = id
    },
    back () {
      this.$router.back(-1)
    },
    submitPayRequest () {
      this.confirmPayment = true
    }
  },
  data () {
    return {
      showPayMethodSelection: false,
      current_check_pay_method_id: 0,
      current_pay_method_id: 0,
      restaurantName: '肥宅快乐餐',
      confirmPayment: false,
      pay_methods: [
        {id: '0', name: '微信支付', icon: '/src/assets/pay/微信支付.svg', hint: '支付成功'},
        {id: '1', name: '支付宝', icon: '/src/assets/pay/支付宝支付.svg', hint: '支付成功'},
        {id: '2', name: '银行卡支付', icon: '/src/assets/pay/银行卡支付.svg', hint: '支付成功'},
        {id: '3', name: '现金支付', icon: '/src/assets/pay/现金支付.svg', hint: '请等待服务员结账'}
      ],
      dishes: [
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          name: '皮蛋瘦肉粥',
          price: 10,
          amount: 3,
          state: '制作中',
          waitingPercent: 80
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          name: '皮蛋粥',
          price: 5,
          amount: 5,
          state: '制作中',
          waitingPercent: 30
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          name: '皮蛋瘦肉粥',
          price: 10,
          amount: 3,
          state: '制作中',
          waitingPercent: 80
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          name: '皮蛋粥',
          price: 5,
          amount: 5,
          state: '制作中',
          waitingPercent: 30
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          name: '皮蛋瘦肉粥',
          price: 10,
          amount: 3,
          state: '制作中',
          waitingPercent: 80
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          name: '皮蛋粥',
          price: 5,
          amount: 5,
          state: '制作中',
          waitingPercent: 30
        },
        {
          img: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750',
          name: '瘦肉粥',
          price: 8,
          amount: 4,
          state: '制作中',
          waitingPercent: 50
        }
      ]
    }
  },
  computed: {
    totalPrice () {
      return this.$store.getters.totalPrice
    },
    current_pay_method () {
      return this.pay_methods[this.current_pay_method_id].name
    },
    confirmPaymentHint () {
      return this.pay_methods[this.current_pay_method_id].hint
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.payDetailsWrapper, {
          scrollY: true,
          click: true
        })
        // console.log(this.scroll)
        // console.log(this.$refs)
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
    // background-color: white;
    margin-bottom: 10px;
    padding-top: 8px;
    // padding-bottom: 10px;
    // border-bottom: 1px solid #EBEBEB;
    .close {
      // height: 100%;
      align-self: center;
      position: absolute;
      left: 15px;
      // padding-bottom: 2px;
    }
    .confirm {
      align-self: center;
      position: absolute;
      right: 15px;
    }
    span {
      // height: 100%;
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
      // font-size: 90%;
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
        }
        
        .dish-amount {
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
                
        .total-price {
          float: right;
          font-size: 12px;
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
    font-weight: bold;
    line-height: 45px;
    opacity: 0.95;
    
    .total-price {
      font-size: 20px;
      margin-left: 10px;
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
