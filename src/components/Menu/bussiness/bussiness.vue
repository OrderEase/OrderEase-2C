
<template>
  <div class="bussiness" id="qq">
    <div class="bg">
    </div>
    <div class="first-section">
      <img :src="bussiness.image"/>
      <div class="text">
        <div class="name">{{bussiness.name}}</div>
        <div class="description">{{bussiness.description}}</div>
      </div>
      <button @click.stop.prevent="toOrder">订单</button>
    </div>
    <div class="line">
    </div>
    <div class="second-section">
      <span class="introduction">{{bussiness.introduction}}</span>
      <span class="activity">{{bussiness.num}}个活动></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bussiness: {
      Object
    }
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
      document.getElementById('qq').style.backgroundImage = this.bussiness.bg
      console.log(this.bussiness.bg)
    })
  },
  methods: {
    toOrder () {
      console.log('to order')
      this.$router.push('/my-order')
    }
  }
}
</script>

<style lang="scss">
.bussiness {
  // background-color: black;
  // background: url('/src/assets/bs.jpeg') no-repeat;
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
    }
    .text {
      margin-left: 10px;
      width: 200px;
      display: flex;
      flex-direction: column;
      .name {
        font-size: 15px;
      }
      .description {
        font-size: 10px;
        color: rgba(227, 227, 227, 1);
        // color: white;
      }
    }
    img {
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
    justify-content: space-between;
    font-size: 13px;
    margin-left: 10px;
    margin-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  div {
    width: 95%;
    // margin-left: 10px;
    // margin-right: 10px;
  }
  .line {
    z-index: 20;
    margin-left: 10px;
    margin-right: 10px;
    height: 1px;
    background-color: rgb(245,245,245);
  }
}
</style>
