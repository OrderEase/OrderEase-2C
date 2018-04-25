<template>
  <transition name="move">
    <div class="details-wrapper" ref="detailsWrapper">
      <div class="food-details">
        <div class="back">
          <x-icon type="ios-arrow-left" size="30"></x-icon>
        </div>
        <img class="food-image" src="http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750">
        <div class="info-area">
          <div class="food-name">{{ foodName }}</div>
          <div class="info">
            <span>月售{{ sales }}</span>
            <span>排队{{ queue }}</span>
          </div>
          <div class="price">
            <span class="unit">¥</span>{{ price }}
          </div>
          <div class="cart-wrapper">
            <div class="cart">
              加入购物车
            </div>
          </div>
        </div>
        <div class="description-area">
          <div class="title">菜品介绍</div>
          <div class="description">{{ description }}</div>
        </div>
        <div class="comment-area">
          <div class="title">菜品评价 (好评度<span class="positive-ratio">{{ positiveRatio }}%</span>)</div>
          <div class="content">{{ comment }}</div>
        </div>
        <div class="comment-area">
          <div class="title">菜品评价 (好评度<span class="positive-ratio">{{ positiveRatio }}%</span>)</div>
          <div class="content">{{ comment }}</div>
        </div>
        <div class="comment-area">
          <div class="title">菜品评价 (好评度<span class="positive-ratio">{{ positiveRatio }}%</span>)</div>
          <div class="content">{{ comment }}</div>
        </div>
      </div>      
    </div>
  </transition>
</template>
<script>
import { Rater } from 'vux'
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      foodName: '皮蛋瘦肉粥',
      price: 10,
      sales: 222,
      queue: 20,
      description: '香浓软滑，饱腹暖心，皮蛋的Q弹与瘦肉的滑嫩伴着粥香溢于满口，让人喝这样的一碗粥也觉得心满意足。',
      comment: '很舒服~',
      positiveRatio: 100
    }
  },
  components: {
    Rater
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.detailsWrapper, {
          scrollY: true,
          click: true
        })
        console.log(this.scroll)
        console.log(this.$refs.detailsWrapper)
      } else {
        this.scroll.refresh()
      }
    })
  }
  // methods: {
  //   _initScroll () {
  //     if (!this.detailsWrapper) {
  //       this.detailsWrapper = new BScroll(this.$refs.detailsWrapper, {
  //         click: true
  //       })
  //     } else {
  //       this.detailsWrapper.refresh()
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.details-wrapper {  
  width: 100%;
  /*height: 200px;*/
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  overflow: hidden;
  background-color: #f3f5f7;
  
  .food-details {
    .food-image {
      height: 425px;
      width: 100%;
    }
    
    .back {
      position: absolute;
      top: 12px;
      left: 6px;
      font-size: 20px;
      padding: 10px;
      fill: white;
    }
    
    .info-area {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      padding: 18px;
      margin-top: -5px;
      background-color: white;
      
      .food-name {
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }
      
      .info {
        display: flex;
        padding: 0;
        padding-top: 8px;
        font-size: 10px;
        color: rgb(147, 153, 159);
        line-height: 10px;
        span {
          &:last-child {
            padding-left: 12px;
          }
        }
      }
      
      .price {
        display: flex;
        padding-top: 18px;
        font-size: 20px;
        font-weight: 700;
        color: rgb(240, 20, 20);
        line-height: 24px;
        
        .unit {
          font-size: 15px;
          padding-top: 1px;
          padding-right: 3px;
          font-weight: normal;
        }
      }
      
      .cart-wrapper {
        position: absolute;
        right: 18px;
        bottom: 18px;
        height: 24px;
        text-align: center;
        
        .cart {
          box-sizing: border-box;
          height: 100%;
          line-height: 24px;
          color: white;
          font-size: 10px;
          padding: 0 12px;
          border-radius: 15px;
          background: rgb(0, 160, 220);
        }  
      }
    }
    
    .description-area {
      padding: 18px;
      background-color: white;
      margin-top: 1px;
      
      .title {
        font-size: 12px;
        font-weight: 500;
        // color: #07111b;
        color: rgb(147, 153, 159);
        margin-bottom: 6px;
      }
      
      .description {
        font-size: 12px;
        font-weight: 200;
        color: rgb(77, 85, 93);
        line-height: 20px;
        // padding: 0 8px;
      }
    }
    
    .comment-area {
      padding: 18px 0;
      position: relative;
      background-color: white;
      margin-top: 10px;
      
      .title {
        padding-left: 18px;
        font-size: 14px;
        font-weight: 500;
        color: #07111b;
        
        .positive-ratio {
          color: #ff4b4b;
        }
      }
      
      .content {
        font-size: 14px;
        padding-left: 18px;
      }
    }
  }
}
</style>
