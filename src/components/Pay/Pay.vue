<template lang="html">
    <div class="pay-wrapper">
      <XHeader class="head" title="支付"></XHeader>
      <div class="wrapper">
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
  import {Divider, Toast, XHeader, CellBox, Group, Checklist, XButton} from 'vux'

  export default {
    components: {
      // Swiper,
      Divider,
      XHeader,
      CellBox,
      Group,
      Checklist,
      XButton,
      Toast
    },
    created () {
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
        // activity_list: baseList,
        // payment: 0,
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
    },
    computed: {
      payment () {
        return this.$store.getters.totalPrice
      }
    }
  }
</script>

<style>
.pay-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  width: 100%;
}
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
