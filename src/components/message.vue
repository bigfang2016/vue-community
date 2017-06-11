<template lang="html">
  <div class="">
    <mu-appbar title="我的消息"></mu-appbar>
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="notread" title="未读消息"/>
      <mu-tab value="read" title="已读消息"/>
    </mu-tabs>
    <div v-if="activeTab === 'notread'">
      <mu-list ref="scrollfile" class="scrollheight">
        <template v-for="(val,index) in hasnot_read_messages">
          <div class="list clearfix">
            <router-link :to="{path:'/user', query:{user:val.author.loginname}}" class="link">
              <div class="list-left">
                <img class="author" :src="val.author.avatar_url" alt="">
                <span>{{val.author.loginname}}</span>
              </div>
            </router-link>
            <router-link :to="{path:'/details', query:{id:val.topic.id}}" class="link">
              <div class="list-right">
                <!-- <h2 v-html="markdownChange(item.reply.content)"></h2> -->
                <span class="title" style="font-size: 16px;font-weight:500;" v-if="!val.reply.content">内容已被作者删除</span>
                <span class="title" style="font-size: 16px;font-weight:500;">{{val.reply.content}}</span>
                <p class="count">
                  <span class="title" >{{val.topic.title}}</span>
                  <!-- <span><span style="color: rgba(158, 120, 192, 1);font-weight: 600;">{{val.reply_count}}</span> / {{val.visit_count}}</span> -->
                  <span class="date">{{val.reply.create_at | timeago}}</span>
                </p>
              </div>
            </router-link>
          </div>
          <mu-divider inset/>
        </template>

      </mu-list>
      <span v-if="!hasnot_read_messages.length">暂无消息</span>
    </div>
    <div v-if="activeTab === 'read'">
      <mu-list ref="scrollfile" class="scrollheight">
        <template v-for="(val,index) in has_read_messages">
          <div class="list clearfix">
            <router-link :to="{path:'/user', query:{user:val.author.loginname}}" class="link">
              <div class="list-left">
                <img class="author" :src="val.author.avatar_url" alt="">
                <span>{{val.author.loginname}}</span>
              </div>
            </router-link>
            <router-link :to="{path:'/details', query:{id:val.topic.id}}" class="link">
              <div class="list-right">
                <!-- <h2 v-html="markdownChange(item.reply.content)"></h2> -->
                <span class="title" style="font-size: 16px;font-weight:500;" v-if="!val.reply.content">内容已被作者删除</span>
                <span class="title" style="font-size: 16px;font-weight:500;">{{val.reply.content}}</span>
                <p class="count">
                  <span class="title" >{{val.topic.title}}</span>
                  <!-- <span><span style="color: rgba(158, 120, 192, 1);font-weight: 600;">{{val.reply_count}}</span> / {{val.visit_count}}</span> -->
                  <span class="date">{{val.reply.create_at | timeago}}</span>
                </p>
              </div>
            </router-link>
          </div>
          <mu-divider inset/>
        </template>

      </mu-list>
      <span v-if="!has_read_messages.length">暂无消息</span>
    </div>
    <personal></personal>
  </div>
</template>

<script>
import Personal from './layout/footer'
import timeago from 'timeago.js'
export default {
  components:{Personal},
  data () {
    return {
      activeTab: 'notread',
      loginkey:'',
      has_read_messages:[],
      hasnot_read_messages:[],
      count:''
    }
  },
  created(){
    this.loginkey = localStorage.getItem('accesstoken')
    if (this.loginkey) {
      this.getDataByGet()
    }else{
      this.$router.push({path:'/login'})
    }

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
    getDataByGet() {
      let that = this
      this.$http
          // .get('https://www.vue-js.com/api/v1/message',{params:{accesstoken:this.loginkey}})
          .get('https://www.vue-js.com/api/v1/messages?accesstoken=' + this.loginkey)
          .then(
            res => {
              that.has_read_messages = res.data.data.has_read_messages
              that.hasnot_read_messages = res.data.data.hasnot_read_messages
            },
            err => {
              console.log(err)
            });
      //未读消息数量
      this.$http
          .get('https://www.vue-js.com/api/v1/message/count?accesstoken=' + this.loginkey)
          .then(
            res => {
              that.count = res.data.data
            },
            err => {
              console.log(err)
            });
    },
  }
}
</script>

<style scoped>
  .mu-appbar{
    position: fixed;
    top: 0;
  }
  .mu-tabs{
    position: fixed;
    top: 56px;
  }
  .mu-list{
    margin-top: 104px;
    margin-bottom: 47px;
  }
  .mu-list{
    text-align: left;
  }
  .mu-divider.inset{
    margin-left: 0;
  }
  .list{
    padding: 10px;
  }
  .list-left{
    float: left;
    width: 20%;
    text-align: center;
    word-wrap: break-word;
  }
  .list-right{
    float: right;
    width: 80%;
  }
  .list-right .count{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .count .title{
    width: 75%;
  }
  .count .date{
    width: 25%;
  }
  .author{
    width: 40px;
    height:40px;
    border-radius: 40px;
  }
  .link{
    color: rgb(44,62,80);
  }
</style>
