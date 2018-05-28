<template lang="html">
    <div>
        <XHeader class="head" title="支付订单"></XHeader>
        <div class="wrapper">
          <Swiper :list="activity_list" direction="horizontal" auto loop></Swiper>
          <Group>
            <cell-box>支付金额：{{payment}}</cell-box>
            <cell-box>订单号：{{order}}</cell-box>
          </Group>
          <toast text="支付成功" is-show-mask v-model="show_toast"></toast>
          <Divider>-</Divider>
        </div>
        <checklist class="ways" :title="请选择支付方式" @on-change="change" :options="inlineDescList" :max=1></checklist>
        <XButton class="payment" :text="button_text" :disabled="isClicked" @click.native="submit" type="primary"></XButton>
    </div>
</template>

<script>
  import {Swiper, Divider, Toast, XHeader, CellBox, Group, Checklist, XButton} from 'vux'
  const baseList = [{
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
    title: '送你一朵fua'
  }, {
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
    title: '送你一辆车'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/5.jpg', // 404
    title: '送你一次旅行',
    fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
  }]

  export default {
    components: {
      Swiper,
      Divider,
      XHeader,
      CellBox,
      Group,
      Checklist,
      XButton,
      Toast
    },
    created () {
      console.log(this.$route.params.money)
      this.payment = this.$route.params.money
    },
    methods: {
      submit () {
        this.show_toast = true
      },
      change (val, label) {
        this.isClicked = val.length === 0
        // console.log('change', val, label, this.isClicked)
      }
    },
    data () {
      return {
        activity_list: baseList,
        payment: 0,
        order: 1,
        button_text: '确认支付',
        isClicked: true,
        show_toast: false,
        inlineDescList: [
          {key: '1', value: '微信支付', inlineDesc: 'Tiger is the king of mountain'},
          {key: '2', value: '银行卡支付', inlineDesc: 'Lion is the king of woods'},
          {key: '3', value: '支付宝', inlineDesc: '满剑'},
          {key: '4', value: '现金支付', inlineDesc: '点击付款后，请等待服务员过来结账'}
        ]
      }
    }
  }
</script>

<style>
.payment {
  float: left;
}

.ways {
  width: 100%;
  float: left;
}

.wrapper {
  float: left;
}


.head {
  float: left;
  width: 100%;
}
</style>
