<template>
  <div class="shake">
      <div class="scroll-wrapper" ref="scrollWrapper">
        <div class="scroll-inner">
          <img class="banner" src="../../assets/shake/shake.png" alt="shake">
          
          <ul>
            <li v-for="food in random_foods" class="food-item" :key="food.id">
              <food-item :food="food" @update="showCart"></food-item>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import FoodItem from '../food-item/food-item'

export default {
  components: {
    FoodItem
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
    showCart (target) {
      console.log(this.random_foods)
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
          padding: 10px 8px 6px 10px;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          overflow: hidden;
          display: flex;
          flex: auto;
        }
      }
    }
  }
</style>
