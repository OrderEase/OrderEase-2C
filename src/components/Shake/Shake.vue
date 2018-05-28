<template>
  <div class="shake">
      <div class="scroll-wrapper" ref="scrollWrapper">
        <div class="scroll-inner">
          <img class="banner" src="../../assets/shake/shake.png" alt="shake">
          
          <ul>
            <li v-for="food in random_foods" class="food-item" :key="food.id">
              <div class="left">
                <div class="food-img">
                  <img :src="food.icon"/>
                </div>
              </div>

              <div class="right">
                <h2 class="food-name">{{food.name}}</h2>
                <p class="food-discription">{{food.discription}}</p>

                <div class="price-wrapper">
                  <span class="price"><span class="unit">￥</span>{{food.price}}</span>
                </div>

                <div class="like-wrapper">
                  <img class="like-icon" src="../../assets/menu/good.png">
                  <span class="like">{{food.like}}</span>
                </div>

                <div class="cart-control-wrapper">
                  <cart-control :food="food" @increment="incrementTotal"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { Rater, InlineXNumber } from 'vux'
import CartControl from '../cart-control/cart-control'

export default {
  components: {
    Rater,
    InlineXNumber,
    CartControl
  },
  data () {
    return {
      random_foods: [{
        'id': 0,
        'name': '宫保鸡丁',
        'price': 12,
        'rater': 3,
        'like': 4,
        'rank': 5,
        'time': 36,
        'discription': 'asddddddddddddddddddddddddddddddddddd'
      },
      {
        'id': 1,
        'name': '小炒肉',
        'price': 12,
        'rater': 3,
        'like': 4,
        'rank': 5,
        'time': 36,
        'discription': 'asddddddddddddddddddddddddddddddddddd'
      },
      {
        'id': 2,
        'name': '麻婆豆腐',
        'price': 12,
        'rater': 3,
        'like': 4,
        'rank': 5,
        'time': 36,
        'discription': 'asddddddddddddddddddddddddddddddddddd'
      },
      {
        'id': 3,
        'name': '水煮鱼',
        'price': 12,
        'rater': 3,
        'like': 4,
        'rank': 5,
        'time': 36,
        'discription': 'asddddddddddddddddddddddddddddddddddd'
      }]
    }
  },
  methods: {
    _initScroll () {
      this.shakeScroll = new BScroll(this.$refs.scrollWrapper, {
        click: true
      })
    },
    incrementTotal (target) {
      
    }
  },
  created () {
    this.$nextTick(() => {
      this._initScroll()
    })
  }
}
</script>

<style lang="scss">
  .shake {
    .scroll-wrapper {
      position: fixed;
      top: 0px;
      bottom: 48px;
      width: 100%;

      .scroll-inner {
        ul, li {
          list-style-type: none;
        }

        .banner {
          margin-top: -1px;
          width: 100%;
          height: 400px;
        }
        
        .food-item {
        padding: 10px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        overflow: hidden;
        display: flex;

        .left {
          flex: 0 0 100px;

          .food-img {
            img {
              width: 100px;
              height: 80px;
            }
          }
        }

        .right {
          padding-left: 10px;
          position: relative;
          overflow: hidden;
          flex: 1;

          .food-name {
            font-size: 15px;
          }

          .food-discription {
            font-size: 14px;
            color: rgb(147, 153, 159);
            line-height: 14px;
            margin-top: 2px;
            width: 160px;
            text-overflow: ellipsis;
            overflow: hidden;
          }

          .price-wrapper {
            margin-top: 10px;
            position: absolute;
            bottom: 4px;
            left: 10px;

            .price {
              color: #f01414;
            }
          }

          .like-wrapper {
            display: inline-block;
            position: absolute;
            bottom: 4px;
            left: 60px;
            
            .like-icon {
              height: 14px;
              width: 14px;
            }
          }

          .cart-control-wrapper {
            position: absolute;
            right: 0;
            bottom: 4px;
          }
        }
      }
      }
    }
  }
</style>
