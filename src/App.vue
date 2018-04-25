<template>
  <div id="app">
    <router-view></router-view>
    <tabbar>
        <tabbar-item>
            <span slot="label">菜单</span>
        </tabbar-item>
        <tabbar-item>
            <span slot="label">购物车</span>
        </tabbar-item>
        <tabbar-item>
            <span slot="label">订单</span>
        </tabbar-item>
    </tabbar>
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
</style>
