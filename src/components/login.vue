<template lang="html">
  <div class="">
    <mu-appbar title="登录中心"></mu-appbar>
    <mu-text-field label="Access Token" type="password" :errorText="err" errorColor="red" labelFloat class="text" v-model="loginkey"/><br/>
    <div class="container">
        <mu-raised-button href="https://www.vue-js.com/signup" label="注册" class="sign-button" primary/>
        <mu-raised-button @click="login" label="登录" class="login-button" primary/>
    </div>

    <personal></personal>
  </div>
</template>

<script>
import Personal from './layout/footer'
export default {
  components:{Personal},
  data(){
    return {
      loginkey:'',
      err:''
    }
  },
  methods:{
    login(){
      let that = this
      that.$http
          .post('https://www.vue-js.com/api/v1/accesstoken', {accesstoken: that.loginkey})
          .then(
            res => {
              that.err = '',
              localStorage.setItem('accesstoken',that.loginkey)
              localStorage.setItem('user_id', res.data.id)
              localStorage.setItem('loginname', res.data.loginname)
               // 跳转到个人中心
              that.$router.push({path:'/personal'})
            },
            err => {
              console.log('err')
              that.err = '登录口令输入有误,请重新输入'
            });
    }
  }
}
</script>

<style scoped>
  .mu-appbar{
    text-align: center;
    position: fixed;
    top: 0;
  }
  .text{
    margin-top: 50%;
  }
  .login-button{
     margin-left: 10px;
  }
  .container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
