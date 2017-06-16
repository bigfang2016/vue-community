<template lang="html">
  <div class="">
    <mu-appbar title="登录中心"></mu-appbar>
    <mu-text-field label="Access Token" type="password" :errorText="err" errorColor="red" labelFloat class="text" v-model="loginkey"/><br/>
    <div class="container">
        <mu-raised-button href="https://www.vue-js.com/signup" label="注册" class="sign-button" />
        <mu-raised-button @click="login" label="登录" class="login-button" primary/>
    </div>
    <div @click="showDetails" class="tips">
        <p>如何获取 Access Token ?</p>
        <p v-show="details" class="detail">在<a href="https://www.vue-js.com/">官网</a>注册登录后，可在设置页查看 Access Token</p>
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
      err:'',
      details: false
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
    },
    showDetails(){
        this.details = !this.details
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
  .sign-button, .login-button{
     width: 70%;
     margin-left: 15%;
     margin-top: 5%;
  }
  .container{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
  }
  .tips{
      width: 80%;
      margin-left: 10%;
      text-align: left;
      padding-top: 10%;
  }
  .detail{
      color: rgb(158, 158, 158);
      padding-left: 10px;
      padding-top: 5%;
  }
</style>
