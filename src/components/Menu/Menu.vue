<template>
  <div class="menu">
    <swiper class="banner" :list="swiper_list" auto dots-class="custom-bottom" dots-position="center"></swiper>

    <div class="content">
      <div class="category-wrapper" ref="categoryWrapper">
        <ul>
          <li v-for="(category, index) in menus" class="category-item" @click="categoryClick(index, $event)" :key="category.id" :class="index == categoryCurrentIndex ? 'category-item-selected' : ''">
            <span class="text">
              {{category.name}}
            </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="category in menus" class="food-list food-list-hook" :key="category.id">
            <h1 class="title">{{category.name}}</h1>
            <ul>
              <li v-for="food in category.foods" class="food-item" :key="food.id">
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
                      <img class="rank-icon" src="../../assets/account.png">
                      <span class="rank">{{food.rank}}</span>
                    </div>
                    <div class="time-wrapper">
                      <img class="time-icon" src="../../assets/clock.png">
                      <span class="rank">{{food.time}}</span>
                    </div>
                  </div>
                </div>
                <div class="bottom">
                  <rater class="rater" v-model="food.rater" disabled :font-size="15"></rater>
                  <div class="like-wrapper">
                    <img class="like-icon" src="../../assets/good.png">
                    <span class="like">{{food.like}}</span>
                  </div>
                  <div class="quantity">
                    <inline-x-number width="50px" :min="0"></inline-x-number>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { Swiper, Rater, InlineXNumber } from 'vux'
import menusData from './data.json'

const swiperList = [{
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg', // 404
  title: '送你一次旅行'
}]

export default {
  components: {
    Swiper,
    Rater,
    InlineXNumber
  },
  data () {
    return {
      swiper_list: swiperList,
      menus: menusData,
      listHeight: [],
      foodsScrollY: 0
    }
  },
  created () {
    this.$nextTick(() => {
      this._initScroll()
      this._calculateHeight()
    })
  },
  computed: {
    categoryCurrentIndex () {
      for (let i = 0, l = this.listHeight.length; i < l; i++) {
        let topHeight = this.listHeight[i]
        let bottomHeight = this.listHeight[i + 1]
        if (!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
          return i
        }
      }
      return 0
    }
  },
  methods: {
    _initScroll () {
      this.categoryWrapper = new BScroll(this.$refs.categoryWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      // 监控滚动事件
      this.foodsScroll.on('scroll', (pos) => {
        this.foodsScrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0, l = foodList.length; i < l; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    categoryClick (index, event) {
      if (!event._constructed) {
        return
      }
      this.foodsScroll.scrollTo(0, -this.listHeight[index], 300)
    }
  }
}
</script>

<style lang="scss">
.menu {
  bottom: 46px;

  .banner {
    height: 180px;
  }

  .content {
    position: absolute;
    overflow: hidden;
    display: flex;
    top: 180px;
    bottom: 46px;
    width: 100%;
    
    ul, li {
      list-style-type: none;
    }

    .category-wrapper {
      flex: 0, 0, 80px;
      width: 80px;
      background: #f3f5f7;
      margin-top: 1px;

      .category-item {
        height: 40px;
        line-height: 40px;
        text-align: center;
        position: relative;

        .text {
          font-size: 14px;
          font-weight: 200;
          padding: 8px;
        }
        
        &:after {
          position: absolute;
          content: '';
          left: 12px;
          width: 56px;
          bottom: 0;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        }
      }

      .category-item-selected {
        background: white;
      }
    }

    .foods-wrapper {
      flex: 1;
      margin-top: 2px;

      .title {
        height: 26px;
        line-height: 26px;
        padding-left: 12px;
        font-size: 14px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
        border-left: 2px solid #d9dde1;
      }

      .food-item {
        padding: 10px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        overflow: hidden;

        .top {
          // height: 100px;
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
              width: 160px;
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
            display: inline-block;
            margin-left: 5px;

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
