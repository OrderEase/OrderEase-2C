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
export default {
  components: {
    Group,
    XInput,
    XButton,
    XDialog,
    Spinner,
    Toast
  },
  data () {
    return {
      username: ''
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    isLoginFail () {
      return this.$store.state.isLoginFail
    },
    isDisable () {
      return this.username === ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        username: this.username
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
