<template>
  <div class="login-wrapper">
    <group>
      <x-input v-model="username" placeholder="请输入测试用户ID" title="用户ID："></x-input>
      <x-button :disabled="isDisable" type="primary" @click.native="login">确认</x-button>
    </group>
    <x-dialog v-model="isLogin">
      <spinner></spinner>
      <span>登录中</span>
    </x-dialog>
    <toast v-model="isLoginFail" type="cancel" position="middle">登录失败</toast>
  </div>
</template>

<script>
import { Group, XInput, XButton, XDialog, Spinner, Toast } from 'vux'
import { mapState } from 'vuex'
export default {
  components: {
    Group,
    XInput,
    XButton,
    XDialog,
    Spinner,
    Toast
  },
  created () {
    console.log('query id', this.$route.query.tableId)
  },
  data () {
    return {
      username: ''
    }
  },
  computed: {
    isDisable () {
      return this.username === ''
    },
    ...mapState({
      isLogin: state => state.user.isLogin,
      isLoginFail: state => state.user.isLoginFail
    })
  },
  methods: {
    login () {
      this.$store.dispatch('user/login', {
        username: this.username,
        tableId: this.$route.query.tableId
      })
    }
  }
}
</script>

<style lang='scss'>
.login-wrapper {
  height: 100%;
  width: 100%;
}
</style>
