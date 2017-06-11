<template lang="html">
  <div class="">
    <!-- 顶部 -->
    <mu-appbar :title="msg.loginname">
      <mu-icon-button @click="goBack" icon="keyboard_backspace" slot="left"/>
    </mu-appbar>
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
      <mu-list>
        <template v-for="(val,index) in msg.recent_topics">
          <div class="list clearfix">
              <router-link :to="{path:'/user', query:{user:val.author.loginname}}" class="link">
                <div class="list-left">
                  <img class="author-img" :src="val.author.avatar_url" alt="">
                </div>
              </router-link>
              <router-link :to="{path:'/details', query:{id:val.id}}" class="link">
                <div class="list-right">
                  <span class="title" style="font-size: 16px;font-weight:500;">{{val.title}}</span>
                  <span class="date">{{val.last_reply_at | timeago}}</span>
                </div>
              </router-link>
          </div>
          <mu-divider inset/>
        </template>
      </mu-list>
      <p v-if="!msg.recent_topics.length">暂无话题</p>
    </div>
    <div v-if="activeTab === 'tab2'">
        <mu-list>
          <template v-for="(val,index) in msg.recent_replies">
            <div class="list clearfix">
              <router-link :to="{path:'/user', query:{user:val.author.loginname}}" class="link">
                <div class="list-left">
                  <img class="author-img" :src="val.author.avatar_url" alt="">
                </div>
              </router-link>
              <router-link :to="{path:'/details', query:{id:val.id}}" class="link">
                <div class="list-right">
                  <span class="title" style="font-size: 16px;font-weight:500;">{{val.title}}</span>
                  <span class="date">{{val.last_reply_at | timeago}}</span>
                </div>
              </router-link>
            </div>
            <mu-divider inset/>
          </template>
        </mu-list>
        <p v-if="!msg.recent_replies.length">暂无回复</p>
    </div>
    <div v-if="activeTab === 'tab3'">
      <mu-list>
        <template v-for="(val,index) in msg.collect_topics">
          <div class="list clearfix">
              <router-link :to="{path:'/user', query:{user:val.author.loginname}}" class="link">
                <div class="list-left">
                  <img class="author-img" :src="val.author.avatar_url" alt="">
                </div>
              </router-link>
              <router-link :to="{path:'/details', query:{id:val.id}}" class="link">
                <div class="list-right">
                  <span class="title" style="font-size: 16px;font-weight:500;">{{val.title}}</span>
                  <span class="date">{{val.last_reply_at | timeago}}</span>
                </div>
              </router-link>
          </div>
          <mu-divider inset/>
        </template>
      </mu-list>
      <p v-if="!msg.collect_topics.length">暂无收藏</p>
    </div>
  </div>
</template>

<script>
import timeago from 'timeago.js'
export default {
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
      let author_loginname = that.$route.query.user//从content.vue的router-link获取
      let url = 'https://www.vue-js.com/api/v1/user/'+ author_loginname
      this.$http
          .get(url)
          .then(
            res => {
              // this.msg = {}
              this.msg = res.data.data
            },
            err => {
              console.log(err)
            });
    },
    goBack() {
      this.$router.go(-1)
      // this.$router.push("/") //不能这样写，因为当你在消息栏目里点击后，直接跳转到首页
    }
  }
}
</script>

<style scoped>
  .mu-appbar{
    text-align: left;
    position: fixed;
    top: 0;
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
</style>
