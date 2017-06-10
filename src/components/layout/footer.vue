<template lang="html">
  <mu-paper>
    <mu-bottom-nav :value="bottomNav" @change="handleChange" @click="print">
      <mu-bottom-nav-item to="/" value="home" title="首页" icon="home"/>
      <mu-bottom-nav-item to="/publish" value="publish" title="发布" icon="assignment"/>
      <mu-bottom-nav-item to="/message" value="message" title="消息" icon="message"/>
      <mu-bottom-nav-item :to="personal_path" value="mine" title="我的" icon="account_circle"/>
    </mu-bottom-nav>
  </mu-paper>
</template>

<script>
export default {
    data() {
        return {
            bottomNav: 'home',
            personal_path:'/personal'
        }
    },
    created(){
      this.getrouteData()
    },
    watch:{
      '$route': 'getrouteData'
    },
    methods: {
        handleChange(val) {
            this.bottomNav = val
        },
        getrouteData(){
          let accesstoken = localStorage.getItem("accesstoken")
          if (accesstoken) {
            this.personal_path = '/personal'
          }else{
            this.personal_path = '/login'
          }
          //解决底部选项显示不同步的问题
          if (this.$route.path === '/') {
              this.bottomNav = 'home'
          }
          if (this.$route.path === '/publish') {
              this.bottomNav = 'publish'
          }
          if (this.$route.path === '/message') {
              this.bottomNav = 'message'
          }
          if (this.$route.path === '/login' || this.$route.path === '/personal') {
              this.bottomNav = 'mine'
          }
        },
        print(){
          console.log(this.bottomNav);
        }
    }
}
</script>

<style scoped>
.mu-paper {
    width: 100%;
    position: fixed;
    bottom: 0;
}
</style>
