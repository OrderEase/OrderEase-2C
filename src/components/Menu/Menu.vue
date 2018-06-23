
<template>
  <div class="menu">
    <bussiness class="bussiness" :bussiness='bs'></bussiness>
    <div class="content">
      <div class="category-wrapper" ref="categoryWrapper">
        <ul>
          <li v-for="(category, index) in menus" class="category-item" @click.stop.prevent="categoryClick(index, $event)" :key="category.id" :class="index == categoryCurrentIndex ? 'category-item-selected' : ''">
            <span class="text">
              {{category.name}}
            </span>
            <span class="num">
              {{category.dishes.length}}
            </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="category in menus" class="food-list food-list-hook" :key="category.id">
            <!-- <h1 class="title">{{category.name}}</h1> -->

            <ul>
              <li v-for="food in category.dishes" class="food-item" :key="food.id" @click="showDialog(food)">
                <food-item :food="food" @update="showCart(food, category.id)"></food-item>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <shop-cart class="cart"></shop-cart>
    <food-detail :food="foodInfo" />
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { Swiper } from 'vux'
import { mapState } from 'vuex'
// import menusData from './data.json'
import Bussiness from './bussiness/bussiness'
import FoodItem from '../food-item/food-item'
import FoodDetail from '../food-item/FoodDetail/food-detail'
import ShopCart from '../Cart/shopCart'
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
    FoodItem,
    Bussiness,
    FoodDetail,
    ShopCart
  },
  data () {
    return {
      swiper_list: swiperList,
      // menus: [],
      listHeight: [],
      foodsScrollY: 0,
      image: '',
      bs: {
        name: '肥宅快乐餐',
        description: '我知道这样不好，但这样真爽。',
        introduction: '只要购买肥宅快乐餐，即送肥宅快乐水！',
        image: './src/assets/image.jpeg',
        bg: 'url(\'/src/assets/bs.jpeg\')',
        num: 2
      },
      foodInfo: {
        name: '宫保鸡丁',
        price: 12,
        like: 4,
        icon: './src/assets/test.jpeg',
        discription: 'asddddddddddddddddddddddddddddddddddd',
        count: 0,
        show: false
      }
    }
  },
  created () {
    this.$store.dispatch('getMenus')
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
    },
    // menus () {
    //   console.log(this.$store.dispatch('getMenus'))
    //   return this.$store.dispatch('getMenus')
    //   // return this.$store.getters.menus
    // }
    ...mapState({
      menus: 'menus'
    })
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
      this.foodsScroll.scrollTo(0, -this.listHeight[index], 300)
    },
    showCart (food, cid) {
      // let temp = this.menus.filter(menu => menu.id === cid)
      console.log('food', food)
      // this.$nextTick(() => {
      //   this.$store.commit('check', {
      //     id: food.id,
      //     name: food.name,
      //     price: food.price,
      //     count: temp[0].foods.filter(f => f.id === food.id)[0].count,
      //     cid: cid
      //   })
      // let temp2 = temp[0].foods.filter(f => f.id === food.id)
      // console.log('count', temp2, temp2[0].name)
      // })
    },
    synatic () {
      console.log('synatic start')
      for (let i = 0; i < this.$store.state.orders.length; ++i) {
        let temp = this.$store.state.orders[i]
        let tempMenu = this.menus.filter(menu => menu.id === temp.cid)[0].foods
        console.log('synatic', tempMenu)
        tempMenu.filter(food => food.id === temp.id)[0].count = temp.num
        console.log('synatic food', tempMenu.filter(food => food.id === temp.id)[0])
      }
    },
    showDialog (food) {
      this.foodInfo.name = food.name
      this.foodInfo.price = food.price
      this.foodInfo.icon = food.img
      this.foodInfo.show = true
      this.foodInfo.description = food.description
      this.foodInfo.like = food.likes
      this.foodInfo.count = food.count
      console.log('showDialog', this.foodInfo)
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
    justify-content: space-around;
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
      width: 80px;
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
        margin-left: 10px;
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
        }
        &:after {
          position: absolute;
          content: '';
          left: 12px;
          width: 56px;
          bottom: 0;
        }
      }
      .category-item-selected {
        background: rgba(83, 158, 249, 1);
        color: rgba(255, 255, 255, 1);
      }
    }
    .foods-wrapper {
      // flex: 1;
      margin-top: 6px;
      overflow: hidden;
      // .title {
      //   height: 26px;
      //   line-height: 26px;
      //   padding-left: 12px;
      //   font-size: 15px;
      //   color: rgb(147, 153, 159);
      //   background: #f3f5f7;
      //   border-left: 2px solid #d9dde1;
      // }
      .food-item {
        height: 100px;
        width: 275px;
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