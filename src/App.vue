<template>
  <div id="app">
    <router-view></router-view>
    <!-- <tabbar class="footer">
      <tabbar-item>
        <router-link slot="label" to="/menu">菜单</router-link>
      </tabbar-item>
      <tabbar-item>
        <router-link slot="label" to="/shake">摇一摇</router-link>
      </tabbar-item>
      <tabbar-item>
        <router-link slot="label" to="/cart">购物车</router-link>
      </tabbar-item>
      <tabbar-item>
        <router-link slot="label" to="/my-order">订单</router-link>
      </tabbar-item>
    </tabbar> -->
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  name: 'app',
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}

#app .footer {
  position: fixed;
}

#app {
  height: 100%;
}

</style>
