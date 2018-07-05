
<template>
  <div class="menu">
    <bussiness class="bussiness" @show-detail='showDetail'></bussiness>
    <div class="content">
      <div class="category-wrapper" ref="categoryWrapper">
        <ul class="category-ul">
          <li v-for="(category, index) in menus" class="category-item" @click.stop.prevent="categoryClick(index, category.id, $event)" :key="category.id" :class="selectedId == category.id ? 'category-item-selected' : ''">
            <span class="text">
              {{category.name}}
            </span>
            <span :class="selectedId == category.id ? 'num-selected' : 'num'">
              {{category.dishes.length}}
            </span>
          </li>
        </ul>
      </div>

      <div class="dishes-wrapper" ref="dishesWrapper">
        <ul>
          <li v-for="category in menus" class="dish-list dish-list-hook" :key="category.id">
            <ul class="dishes-ul" v-show="category.id == selectedId">
              <li v-for="dish in category.dishes" class="dish-item" :key="dish.id" @click="showDialog(dish)">
                <dish-item :dish="dish"></dish-item>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <shop-cart class="cart"></shop-cart>
    <dish-detail @hide='hide' @update='update' :showDD="showDD"/>
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
      image: '',
      showBS: {
        show: false
      },
      showDD: false
    }
  },
  created () {
    console.log('menu:', this.$store.state.menu.menus)
    this.$nextTick(() => {
      this._initScroll()
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
    ...mapState({
      menus: state => state.menu.menus,
      selectedId: state => state.menu.selectedId
    })
  },
  methods: {
    hide () {
      this.showDD = false
    },
    _initScroll () {
      this.categoryWrapper = new BScroll(this.$refs.categoryWrapper, {
        click: true,
        bounceTime: 350
      })
      this.dishesScroll = new BScroll(this.$refs.dishesWrapper, {
        click: true,
        probeType: 3
      })
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
      this.$store.commit('menu/changeSelectedId', {
        id: id
      })
      this.$nextTick(() => {
        this.dishesScroll.refresh()
        this.dishesScroll.scrollTo(0, 0, 300)
      })
      console.log('selected id:', id)
    },
    showDialog (dish) {
      console.log('dish show')
      this.$store.commit('menu/changeSelectedDish', {
        id: dish.id
      })
      this.showDD = true
    },
    update (value) {
      console.log('update dish in detail', value)
      this.dishInfo.count = value
    }
  }
}
</script>

<style lang="scss">
.menu {
  bottom: 46px;
  display: flex;
  flex-direction: column;
  height: 100%;
  .content {
    position: absolute;
    top: 140px;
    background-color: rgba(246, 249, 255, 1);
    overflow: hidden;
    display: flex;
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

    .category-wrapper {
      width: 120px;
      background: #f3f5f7;
      background-color: rgba(246, 249, 255, 1);
      margin-top: 15px;
      overflow: hidden;
      .category-ul::after {
        content: '';
        height: 100px;
        display: block;
      }
      .category-item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
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
        // &:after {
        //   position: absolute;
        //   content: '';
        //   left: 12px;
        //   width: 56px;
        //   bottom: 0;
        // }
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
      margin-top: 6px;
      overflow: hidden;
      width: 100%;
      margin-right: 15px;
      margin-left: 3px;
      .dishes-ul::after {
        content: '';
        height: 65px;
        display: block;
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
    bottom: 0px;
  }
</style>