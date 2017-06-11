<template lang="html">
  <div class="">
    <!-- 顶部 -->
    <mu-appbar title="个人中心"></mu-appbar>
    <!-- 用户信息 -->
    <mu-list class="author">
        <img class="author-img" :src="msg.avatar_url" alt="">
        <p class="author-name">{{msg.loginname}}</p>
        <p class="author-count">
          <span>积分：{{msg.score}}</span>
          <span>注册时间：{{msg.create_at | timeago}}</span>
        </p>
      <mu-divider inset class="author-inset"/>
    </mu-list>
    <!-- 用户话题 -->
    <mu-tabs :value="activeTab" @change="handleTabChange" class="tabs">
      <mu-tab value="tab1" title="最近话题" class="tab" />
      <mu-tab value="tab2" title="最近回复" class="tab" />
      <mu-tab value="tab3" title="收藏话题" class="tab" />
    </mu-tabs>
    <div v-if="activeTab === 'tab1'">
      <mu-list class="recent-active">
        <template v-for="(val,index) in msg.recent_topics">
          <div class="list clearfix">
              <div class="list-left">
                <img class="author-img" :src="val.author.avatar_url" alt="">
              </div>
              <div class="list-right">
                <span class="title" style="font-size: 16px;font-weight:500;">{{val.title}}</span>
                <span class="date">{{val.last_reply_at | timeago}}</span>
              </div>
          </div>

          <mu-divider inset/>
        </template>
      </mu-list>
      <span v-if="!msg.recent_topics.length">暂无话题</span>
    </div>
    <div v-if="activeTab === 'tab2'">
        <mu-list class="recent-active">
          <template v-for="(val,index) in msg.recent_replies">
            <div class="list clearfix">
              <router-link :to="{path:'/user', query:{user:val.author.loginname}}" class="link">
                <div class="list-left">
                  <img class="author-img" :src="val.author.avatar_url" alt="">
                </div>
              </router-link>
              <router-link :to="{name:'details'}" class="link">
                <div class="list-right">
                  <span class="title" style="font-size: 16px;font-weight:500;">{{val.title}}</span>
                  <span class="date">{{val.last_reply_at | timeago}}</span>
                </div>
              </router-link>
            </div>
            <mu-divider inset/>
          </template>
        </mu-list>
        <span v-if="!msg.recent_replies.length">暂无回复</span>
    </div>
    <div v-if="activeTab === 'tab3'">
      <mu-list class="recent-active">
        <template v-for="(val,index) in msg.collect_topics">
          <div class="list clearfix">
              <div class="list-left">
                <img class="author-img" :src="val.author.avatar_url" alt="">
              </div>
              <div class="list-right">
                <span class="title" style="font-size: 16px;font-weight:500;">{{val.title}}</span>
                <span class="date">{{val.last_reply_at | timeago}}</span>
              </div>
          </div>
          <mu-divider inset/>
        </template>
      </mu-list>
      <span v-if="!msg.collect_topics.length">暂无收藏</span>
    </div>
    <mu-raised-button
      @click="logout"
      label="退出登录"
      class="logout-button"
      icon="power_settings_new"
      primary/>
    <personal></personal>
  </div>

</template>

<script>
import timeago from 'timeago.js'
import Personal from './layout/footer'
export default {
  components:{
    Personal
  },
  data () {
    return {
      msg: {},
      activeTab: 'tab1'
    }
  },
  created() {
    this.getDataByGet()
  },
  filters: {
    timeago(val) {
        let time = new Date(val)
        var thistime = timeago()
        return thistime.format(time, 'zh_CN')
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },
    //请求数据
    getDataByGet() {
      let that = this

      let author_loginname = localStorage.getItem('loginname')
      let url = 'https://www.vue-js.com/api/v1/user/'+ author_loginname
      this.$http
          .get(url)
          .then(
            res => {
              this.msg = res.data.data
            },
            err => {
              console.log(err)
            });
    },
    logout() {
      //将存储在localStorage里的口令清空
      localStorage.setItem('accesstoken','')
      this.$router.push({path:'/login'})
    }
  }
}
</script>

<style scoped>
  .mu-appbar{
    text-align: center;
    position: fixed;
    top: 0;
    z-index: 4;
  }
  .author{
    margin-top: 56px;
  }
  .author-img{
    width: 40px;
    height:40px;
    border-radius: 40px;
  }
  .author-name{
    font-size: 22px;
    color: #009688;
    margin-bottom: 10px;
  }
  .author-count{
    display: flex;
    justify-content: space-around;
  }

  .mu-divider.inset{
    margin-left: 0;

  }
  .author-inset{
    margin-top: 20px;
  }

  .tabs{
    background: transparent;
    border-bottom: 1px solid rgb(239,239,239);
  }
  .tab{
    color: #000;
  }
  .tabs .mu-tab-link-highlight{
    background-color: #009688;
  }
  .recent-active{
    margin-bottom: 84px;
  }
  .list{
    padding: 10px;
  }
  .list-left{
    float: left;
    width: 20%;
    text-align: center;
  }
  .list-right{
    float: right;
    width: 80%;
    display: flex;
    justify-content: space-between;
  }
  .list-right .title{
    text-align: left;
    width: 75%;
  }
  .list-right .date{
    width: 25%;
  }
  .link{
    color: rgb(44,62,80);
  }

  .logout-button{
    width: 100%;
    position: fixed;
    bottom: 56px;
    right: 0;
  }
</style>
