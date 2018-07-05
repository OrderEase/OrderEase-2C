<template>
  <div class="login-wrapper">
    <div class="mask"></div>
    <div class="login">
      <div class="title">Order Ease</div>
      <div class="descri">Sign in to your account!</div>
      <input v-model="username" placeholder="username" class="login-username">
      <button @click="login" :disabled="isDisable" class="login-btn">Sign in</button>
    </div>
    <x-dialog v-model="isLogin">
      <spinner></spinner>
      <span>登录中</span>
    </x-dialog>
    <toast @on-hide="changeState" v-model="isLoginFail" type="cancel" position="middle">登录失败</toast>
  </div>
</template>

<script>
import { XDialog, Spinner, Toast } from 'vux'
import { mapState } from 'vuex'
export default {
  components: {
    XDialog,
    Spinner,
    Toast
  },
  created () {
    console.log('query id', this.$route.query.tableId)
    document.title = '桌号 ' + this.$route.query.tableId
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
      console.log('tableId', this.$route.query.tableId)
      console.log('isLoginFailed', this.isLoginFail)
    },
    changeState () {
      this.$store.commit('user/changeLoginState')
    }
  }
}
</script>

<style lang='scss'>
.login-wrapper {
  height: 100%;
  width: 100%;
  background: url('../../assets/bs.jpeg') no-repeat center;
  .mask {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .login {
    position: fixed;
    border-radius: 4px;
    border-width: 1px;
    background-color: rgba(248, 248, 255, 0.85);
    border-color: rgba(248,248,255, 1);
    width: 80%;
    height: 40%;
    top: 25%;
    left: 10%;
    .login-username {
      position: relative;
      width: 65%;
      height: 40px;
      padding-left: 5%;
      border-radius: 2px;
      border-style: solid;
      border-color: white;
      left: 15%;
      margin-top: 10%;
      display: block;
      font-size: 16px;
    }
    .login-btn {
      position: relative;
      color: white;
      background-color: rgba(83, 158, 249, 1);
      border-color: rgba(83, 158, 249, 1);
      border-style: solid;
      border-radius: 2px;
      width: 71%;
      margin-top: 10%;
      height: 40px;
      left: 15%;
      font-size: 16px;
    }
    .title {
      text-align: center;
      font-size: 30px;
      margin-top: 3%;
      font-weight: lighter;
      font-family: Arial, Helvetica, sans-serif
    }
    .descri {
      text-align: center;
      font-size: 12px;
      color: gray;
    }
  }
}
</style>
