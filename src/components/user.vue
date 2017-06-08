<template lang="html">
  <div class="">
    <mu-appbar :title="msg.loginname">
      <mu-icon-button @click="goBack" icon="keyboard_backspace" slot="left"/>
    </mu-appbar>
    <mu-list class="author">
        <img class="author-img" :src="msg.avatar_url" alt="">
        <p class="author-name">{{msg.loginname}}</p>
        <div class="author-score">
          <div class="column">
            <span class="item">积分：</span>
            <span class="item">{{msg.score}}</span>
          </div>
          <div class="column">
            <span class="item">注册时间：</span>
            <span class="item">{{msg.create_at | timeago}}</span>
          </div>
        </div>

        <!-- <p class="author-score"><span>积分：</span></p>
        <p class="author-create"><span>注册时间：</span>{{msg.create_at | timeago}}</p> -->

      <mu-divider inset class="author-inset"/>
    </mu-list>
    <mu-tabs :value="activeTab" @change="handleTabChange" class="tabs">
      <mu-tab value="tab1" title="最近话题" class="tab" />
      <mu-tab value="tab2" title="最近回复" class="tab" />
      <mu-tab value="tab3" title="收藏话题" class="tab" />
    </mu-tabs>
    <div v-if="activeTab === 'tab1'">
      <mu-list>
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
    </div>
    <div v-if="activeTab === 'tab3'">
      <mu-list>
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
    </div>

      <!-- <template v-for="(val,index) in msg"> -->
        <!-- <div class="list clearfix">

            <div class="list-right">
              <span class="title" style="font-size: 16px;font-weight:500;">{{val.title}}</span>
              <p class="count">
                <span><span style="color: rgba(158, 120, 192, 1);font-weight: 600;">{{val.reply_count}}</span>/ {{val.visit_count}}</span>
                <span class="date">{{val.last_reply_at | timeago}}</span>
              </p>
            </div>
        </div> -->

      <!-- </template> -->


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
      // this.getDataByGet()
    },
    //请求数据
    getDataByGet() {
      let that = this
      let author_loginname = that.$route.query.user
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
  }
  .author-score{
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
  }

  .author-score .column {
    flex-basis: 100%;
    display: flex;
    justify-content: center;
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
