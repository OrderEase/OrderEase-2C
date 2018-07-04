
<template>
  <div class="bussiness">
    <div class="bg">
    </div>
    <div class="first-section">
      <img :src="bussiness.img" @click.stop.prevent="changeShow" />
      <div class="text" @click.stop.prevent="changeShow">
        <div class="name">{{bussiness.name}}</div>
        <div class="description">{{bussiness.description}}</div>
      </div>
      <button @click.stop.prevent="toOrder">
        订单
        <badge v-show="unfinishedOrdersCount > 0" class="unfinished-orders-count" :text="unfinishedOrdersCount"></badge>
      </button>
    </div>
    <div class="line">
    </div>
    <div class="second-section" @click.stop.prevent="changeShow">
      <marquee>
        <marquee-item v-for="promotion in promotions" :key="promotion.id" class="introduction">{{promotion.data}}</marquee-item>
      </marquee>
      <div class="activity">{{bussiness.num}}个活动 ></div>
    </div>
  </div>
</template>

<script>
import { Marquee, MarqueeItem, Badge } from 'vux'
import { mapGetters } from 'vuex'
export default {
  components: {
    Marquee,
    MarqueeItem,
    Badge
  },
  data () {
    return {
      name: '肥宅快乐餐',
      description: '我知道这样不好，但这样真爽。',
      introduction: '只要购买肥宅快乐餐，即送肥宅快乐水！',
      num: 2
    }
  },
  created () {
    this.$nextTick(() => {
      console.log('bussiness num 1', this.bussiness.num)
    })
    console.log('bussiness num 2', this.bussiness.num)
  },
  computed: {
    bussiness () {
      return this.$store.state.restaurant.restaurant
    },
    promotions () {
      return this.$store.state.promotion.promotions
    },
    ...mapGetters({
      unfinishedOrdersCount: 'order/unfinishedOrdersCount'
    })
  },
  methods: {
    toOrder () {
      console.log('to order')
      this.$router.push('/my-order')
    },
    changeShow () {
      this.$emit('show-detail')
      console.log('change show')
    }
  }
}
</script>

<style lang="scss">
.bussiness {
  // background-color: black;
  background: url('../../../assets/bs.jpeg') no-repeat;
  background-repeat: no-repeat;
  background-position: center;
  // background-size: 100% 100%;
  background-size: cover;
  z-index: 0;
  .bg {
    position: absolute;
    z-index: 0;
    background-color: rgba(97, 97, 97, 1);
    height: 141px;
    width: 100%;
    opacity: 0.44;
  }
  width: 100%;
  color: white;
  .first-section {
    position: relative;
    z-index: 20;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    button {
      // flex-grow: 1;
      align-self: center;
      background-color: rgba(255, 255, 255, 0);
      border-color: white;
      border-width: 2px;
      border-style: solid;
      font-size: 15px;
      margin-right: 2px;
      color: white;
      width: 60px;
      height: 38px;
      position: relative;
      
      .unfinished-orders-count {
        position: absolute;
        top: -8px;
        right: -8px;
        height: 16px;
        width: 16px;
      }
    }
    .text {
      flex-grow: 1;
      margin-left: 10px;
      width: 200px;
      display: flex;
      flex-direction: column;
      .name {
        font-size: 15px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .description {
        font-size: 12px;
        width: 200px;
        color: rgba(227, 227, 227, 1);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        // color: white;
      }
    }
    img {
      // flex-grow: 1;
      height: 60px;
      width: 60px;
      border-color: white;
      border-radius: 5px;
    }
  }
  .second-section {
    position: relative;
    z-index: 20;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 13px;
    margin-left: 10px;
    margin-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    .introduction {
      flex-grow: 1;
      width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .activity {
      width: 70px;
      flex-grow: 1;
      text-align: right;
      // margin-right: 15px;
    }
  }
  div {
    width: 95%;
    // margin-left: 10px;
    // margin-right: 10px;
  }
  .line {
    position: relative;
    z-index: 20;
    margin-left: 10px;
    margin-right: 10px;
    height: 1px;
    background-color: rgb(245,245,245);
  }
}
</style>
