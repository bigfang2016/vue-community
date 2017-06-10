<template lang="html">
  <div class="">
    <mu-appbar title="我的消息"></mu-appbar>
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="tab1" title="未读消息"/>
      <mu-tab value="tab2" title="已读消息"/>
    </mu-tabs>
    <div v-if="activeTab === 'tab1'">
      <h2>Tab One</h2>
      <p>
        这是第一个 tab
      </p>
    </div>
    <div v-if="activeTab === 'tab2'">
      <h2>Tab Two</h2>
      <p>
        这是第二个 tab
      </p>
    </div>
    <personal></personal>
  </div>
</template>

<script>
import Personal from './layout/footer'
export default {
  components:{Personal},
  data () {
    return {
      activeTab: 'tab1',
      loginkey:''
    }
  },
  created(){
    this.getDataByGet()
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },
    getDataByGet() {
      let that = this
      this.loginkey = localStorage.getItem('accesstoken')      
      this.$http
          .get('https://www.vue-js.com/api/v1/message',{params:{accesstoken:this.loginkey}})
          .then(
            res => {
              this.msg = res.data.data
            },
            err => {
              console.log(err)
              that.$router.push({path:'/login'})
            });
    },
  }
}
</script>

<style lang="css">
</style>
