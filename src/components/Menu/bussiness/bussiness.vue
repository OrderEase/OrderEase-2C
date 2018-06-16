
<template>
  <div class="bussiness">
    <div class="first-section">
      <img :src="bussiness.image"/>
      <div class="text">
        <div class="name">{{bussiness.name}}</div>
        <div class="description">{{bussiness.description}}</div>
      </div>
      <button>订单</button>
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
  }
}
</script>

<style lang="scss">
.bussiness {
  background-color: black;
  color: white;
  .first-section {
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .second-section {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  button {
    align-self: center;
    background-color: rgba(0, 0, 0, 0);
    border-color: white;
    border-width: 2px;
    border-style: solid;
    font-size: 15px;
    color: white;
    width: 65px;
    height: 40px;
  }
  div {
    width: 95%;
    margin-left: 10px;
    margin-right: 10px;
  }
  .text {
    margin: 0px;
    width: 250px;
    display: flex;
    flex-direction: column;
    .name {
      font-size: 15px;
    }
    .description {
      font-size: 10px;
      color: rgba(206, 209, 220, 1);
    }
  }
  img {
    height: 60px;
    width: 60px;
    border-color: white;
    border-radius: 6%;
  }
  .line {
    height: 1px;
    background-color: gray;
  }
}
</style>
