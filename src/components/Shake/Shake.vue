<template>
  <div class="shake">
      <div class="scroll-wrapper" ref="scrollWrapper">
        <div class="scroll-inner">
          <img class="banner" src="../../assets/shake/shake.png" alt="shake">
          <ul>
            <li v-for="food in random_foods" class="food-item" :key="food.id">
              <div class="top">
                <div class="food-img">
                  <img :src="food.icon"/>
                </div>
                <div class="food-info">
                  <h2>{{food.name}}</h2>
                  <p class="discription">{{food.discription}}</p>
                  <div class="price-wrapper">
                    <span class="price"><span class="unit">￥</span>{{food.price}}</span>
                  </div>
                  <div class="rank-wrapper">
                    <img class="rank-icon" src="../../assets/menu/account.png">
                    <span class="rank">{{food.rank}}</span>
                  </div>
                  <div class="time-wrapper">
                    <img class="time-icon" src="../../assets/menu/clock.png">
                    <span class="rank">{{food.time}}</span>
                  </div>
                </div>
              </div>
              <div class="bottom">
                <rater class="rater" v-model="food.rater" disabled :font-size="15"></rater>
                <div class="like-wrapper">
                  <img class="like-icon" src="../../assets/menu/good.png">
                  <span class="like">{{food.like}}</span>
                </div>
                <div class="quantity">
                  <inline-x-number width="50px" :min="0"></inline-x-number>
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

export default {
  components: {
    Rater,
    InlineXNumber
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

          .top {
            display: flex;

            .food-img {
              width: 100px;
              float: left;
              flex: 0 0 100px;

              img {
                width: 80px;
                height: 62px;
              }
            }

            .food-info {
              float: left;
              flex: 1;

              h2 {
                font-size: 14px;
              }

              .discription {
                font-size: 14px;
                color: rgb(147, 153, 159);
                line-height: 14px;
                margin-top: 2px;
                width: 260px;
                text-overflow: ellipsis;
                overflow: hidden;
              }

              .price-wrapper {
                margin-top: 3px;
                float: left;

                .price {
                  color: #f01414;
                }
              }

              .rank-wrapper {
                margin-top: 3px;
                margin-left: 20px;
                float: left;
                
                .rank-icon {
                  height: 14px;
                  width: 14px;
                }
              }

              .time-wrapper {
                margin-top: 3px;
                margin-left: 20px;
                float: left;

                .time-icon {
                  height: 14px;
                  width: 14px;
                }
              }
            }
          }

          .bottom {
            .like-wrapper {
              display: inline-block;
              margin-left: 18px;

              .like-icon {
                height: 14px;
                width: 14px;
              }
            }
            .quantity {
              float: right;

              .vux-inline-x-number {
                height: 20px !important;
              }
            }
          }
        }
      }
    }
  }
</style>
