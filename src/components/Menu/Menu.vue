
<template>
  <div class="menu">
    <bussiness class="bussiness" @show-detail='showDetail' :bussiness='bs'></bussiness>
    <div class="content">
      <div class="category-wrapper" ref="categoryWrapper">
        <ul>
          <li v-for="(category, index) in menus" class="category-item" @click.stop.prevent="categoryClick(index, category.id, $event)" :key="category.id" :class="selected_id == category.id ? 'category-item-selected' : ''">
            <span class="text">
              {{category.name}}
            </span>
            <span :class="selected_id == category.id ? 'num-selected' : 'num'">
              {{category.dishes.length}}
            </span>
          </li>
        </ul>
      </div>

      <div class="dishes-wrapper" ref="dishesWrapper">
        <ul>
          <li v-for="category in menus" class="dish-list dish-list-hook" :key="category.id">
            <!-- <h1 class="title">{{category.name}}</h1> -->

            <ul class="dishes-ul" v-show="category.id == selected_id">
              <li v-for="dish in category.dishes" class="dish-item" :key="dish.id" @click="showDialog(dish)">
                <dish-item :dish="dish"></dish-item>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <shop-cart class="cart"></shop-cart>
    <dish-detail :dish="dishInfo" />
    <bs-detail :bus="showBS" />
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { Swiper } from 'vux'
import { mapState } from 'vuex'
import Bussiness from './bussiness/bussiness'
import DishItem from '../dish-item/dish-item'
import DishDetail from '../dish-item/DishDetail/dish-detail'
import ShopCart from '../Cart/shopCart'
import BsDetail from './bussiness/bs-detail'
export default {
  components: {
    Swiper,
    DishItem,
    Bussiness,
    BsDetail,
    DishDetail,
    ShopCart
  },
  data () {
    return {
      listHeight: [],
      dishesScrollY: 0,
      // selected_id: 0,
      image: '',
      showBS: {
        show: false
      },
      // bs: {
      //   name: '肥宅快乐餐',
      //   description: '我知道这样不好，但这样真爽。',
      //   introduction: '只要购买肥宅快乐餐，即送肥宅快乐水！ssssssssssssssss',
      //   img: './src/assets/image.jpeg',
      //   bg: 'url(\'/src/assets/bs.jpeg\')',
      //   num: 2
      // },
      dishInfo: {
        name: '宫保鸡丁',
        price: 12,
        likes: 4,
        img: './src/assets/test.jpeg',
        description: 'asddddddddddddddddddddddddddddddddddd',
        count: 0,
        show: false
      }
    }
  },
  created () {
    this.$store.dispatch('getMenus')
    this.$store.dispatch('getRestaurant')
    this.$store.dispatch('getPromotions')
    this.$nextTick(() => {
      this._initScroll()
      // this._calculateHeight()
    })
  },
  computed: {
    categoryCurrentIndex () {
      for (let i = 0, l = this.listHeight.length; i < l; i++) {
        let topHeight = this.listHeight[i]
        let bottomHeight = this.listHeight[i + 1]
        if (!bottomHeight || (this.dishesScrollY >= topHeight && this.dishesScrollY < bottomHeight)) {
          return i
        }
      }
      return 0
    },
    // menus () {
    //   console.log(this.$store.dispatch('getMenus'))
    //   return this.$store.dispatch('getMenus')
    //   // return this.$store.getters.menus
    // }
    ...mapState({
      menus: 'menus',
      selected_id: 'selected_id',
      bs: 'restaurant'
    })
  },
  methods: {
    _initScroll () {
      this.categoryWrapper = new BScroll(this.$refs.categoryWrapper, {
        click: true
      })
      this.dishesScroll = new BScroll(this.$refs.dishesWrapper, {
        click: true,
        probeType: 3
      })
      // 监控滚动事件
      // this.dishesScroll.on('scroll', (pos) => {
      //   this.dishesScrollY = Math.abs(Math.round(pos.y))
      // })
    },
    _calculateHeight () {
      let dishList = this.$refs.dishesWrapper.querySelectorAll('.dish-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0, l = dishList.length; i < l; i++) {
        let item = dishList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    showDetail () {
      console.log('show detail', this.showBS.show)
      this.showBS.show = true
    },
    categoryClick (index, id, event) {
      // this.dishesScroll.scrollTo(0, -this.listHeight[index], 300)
      // this.selected_id = id
      this.$store.commit('changeSelectedId', {
        id: id
      })
      this.$nextTick(() => {
        this.dishesScroll.refresh()
        this.dishesScroll.scrollTo(0, 0, 300)
      })
      console.log('selected id:', id)
    },
    showDialog (dish) {
      console.log('dish show', this.dishInfo.show)
      this.dishInfo.id = dish.id
      this.dishInfo.name = dish.name
      this.dishInfo.price = dish.price
      this.dishInfo.img = dish.img
      this.dishInfo.show = true
      this.dishInfo.description = dish.description
      this.dishInfo.likes = dish.likes
      this.dishInfo.count = dish.count
      console.log('showDialog', this.dishInfo)
    }
  }
}
</script>

<style lang="scss">
.menu {
  bottom: 46px;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  height: 100%;
  .content {
    position: absolute;
    top: 140px;
    background-color: rgba(246, 249, 255, 1);
    overflow: hidden;
    display: flex;
    // bottom: 46px;
    justify-content: space-between;
    width: 100%;
    height: 78%;
    ul, li {
      margin-top: -5px;
      list-style-type: none;
    }

    ul {
      background: rgba(246, 249, 255, 1);
      margin-top: 1px;
    }

    // li {
    //   background-color: white;
    //   border-radius: 5px;
    //   border-color: white;
    //   border-style: solid;
    // }

    .category-wrapper {
      width: 120px;
      // flex: 0 0 80px;
      background: #f3f5f7;
      background-color: rgba(246, 249, 255, 1);
      margin-top: 1px;
      overflow: hidden;
      .category-item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        // background-color: rgba(83, 158, 249, 1);
        background-color: rgba(236, 240, 249, 1);
        color: rgba(119, 122, 131, 1);
        width: 60px;
        height: 60px;
        border-radius: 5px;
        border-width: 1px;
        margin-top: 15px;
        margin-left: 15px;
        .num {
          width: 55px;
          font-size: 25px;
          text-align: right;
          color: rgba(206, 209, 220, 1);
        }
        .text {
          width: 45px;
          margin-left: 6px;
          font-size: 14px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        &:after {
          position: absolute;
          content: '';
          left: 12px;
          width: 56px;
          bottom: 0;
        }
      }
      .num-selected {
        width: 55px;
        font-size: 25px;
        text-align: right;
        color: rgba(175, 212, 251, 1);
      }
      .category-item-selected {
        background: rgba(83, 158, 249, 1);
        color: white;
        box-shadow: 0px 8px 16px 0px rgba(202, 225, 254, 1);        
      }
    }
    .dishes-wrapper {
      // flex: 1;
      margin-top: 6px;
      overflow: hidden;
      width: 100%;
      margin-right: 15px;
      margin-left: 3px;
      // .title {
      //   height: 26px;
      //   line-height: 26px;
      //   padding-left: 12px;
      //   font-size: 15px;
      //   color: rgb(147, 153, 159);
      //   background: #f3f5f7;
      //   border-left: 2px solid #d9dde1;
      // }
      .dishes-ul::after {
        content: '';
        height: 40px;
        display: block;
        // width: 20px;
      }
      .dish-item {
        height: 100px;
        width: 100%;
        margin-right: 15px;
        padding: 15px 8px 6px 6px;
        overflow: hidden;
        display: flex;
      }
    }
  }
}
.cart {
    height: 50px;
    width: 100%;
    position: absolute;
    // top: 483px;
    bottom: 0px;
  }
</style>