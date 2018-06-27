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
  </div>
</template>

<script>
import { Group, XInput, XButton, XDialog, Spinner } from 'vux'
export default {
  components: {
    Group,
    XInput,
    XButton,
    XDialog,
    Spinner
  },
  data () {
    return {
      username: '',
      isLogin: false
    }
  },
  computed: {
    isDisable () {
      return this.username === ''
    }
  },
  methods: {
    login () {
      this.isLogin = true
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
