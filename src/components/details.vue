<template lang="html">
  <div class="">
    <!-- 顶部 -->
    <mu-appbar title="话题详情">
      <mu-icon-button @click="goBack" icon="keyboard_backspace" slot="left"/>
    </mu-appbar>
    <!-- 用户信息 -->
    <mu-list class="topic">
        <span v-if="msg.top" class="table">置顶</span>
        <span v-else-if="msg.good" class="table">精华</span>
        <span v-else-if="msg.tab === 'share'" class="table" style="background:#999">分享</span>
        <span v-else-if="msg.tab === 'ask'" class="table" style="background:#999">问答</span>
        <span v-else-if="msg.tab === 'job'" class="table" style="background:#999">招聘</span>
        <span class="topic-title">{{msg.title}}</span>

        <ul class="topic-items">
          <li class="topic-item">发布于 {{msg.create_at | timeago}}</li>
          <li class="topic-item">作者{{msg.author.loginname}}</li>
          <li class="topic-item">{{msg.visit_count}}次浏览</li>
          <li class="topic-item">
            <span>来自</span>
            <span v-if="msg.tab === 'share'">分享</span>
            <span v-else-if="msg.tab === 'ask'">问答</span>
            <span v-else-if="msg.tab === 'job'">招聘</span>
          </li>
        </ul>
        <!-- 收藏 -->
        <mu-checkbox :label="collect_text" class="demo-checkbox" uncheckIcon="favorite_border" checkedIcon="favorite" v-model="collect"/> <br/>
        <!-- <mu-raised-button  class="demo-raised-button" :icon="collect_icon" /> -->
      <mu-divider inset class="topic-inset"/>
      <div class="topic-content">

      </div>
    </mu-list>



  </div>
</template>

<script>
import timeago from 'timeago.js'
export default {
  data () {
    return {
      msg: {
        author:{loginname:''}
      },
      accesstoken: '',
      loginname:'',//储存登录者的用户名
      collect_text:'收藏话题',
      collect: false

    }
  },
  created() {
    this.accesstoken = localStorage.getItem('accesstoken')
    this.user_id = localStorage.getItem("user_id")
    this.loginname = localStorage.getItem("loginname")
    this.getDataByGet()
    console.log(this.msg);
    // this.getInnerHTML()
  },
  //实时监测collect值的变化
  watch: {
      collect: function(newVal) {
          if (newVal) {
              this.toCollect()
          } else {
              this.deCollect()
          }
      }
  },
  filters: {
    timeago(val) {
        let time = new Date(val)
        var thistime = timeago()
        return thistime.format(time, 'zh_CN')
    }
  },
  // mounted(){
  //   this.getInnerHTML()
  //   console.log(this.msg);
  // },
  methods: {
    //请求数据
    getDataByGet() {
      let that = this
      let id = that.$route.query.id//从content.vue的router-link获取
      let url = 'https://www.vue-js.com/api/v1/topic/'+ id
      this.$http
          .get(url)
          .then(
            res => {
              // this.msg = {}
              this.msg = res.data.data
              this.getInnerHTML()
              if(this.accesstoken){
                  this.isCollected()
              }
            },
            err => {
              console.log('err')
            });
    },
    getInnerHTML(){
      let str = this.msg.content
      document.querySelector(".topic-content").innerHTML = str
    },
    goBack() {
      this.$router.go(-1)
    },
    isCollected(){

      let that = this
      this.$http
          .get('https://www.vue-js.com/api/v1/user/'+ that.loginname)
          .then(
            res => {
              let arr = res.data.data.collect_topics
              let collect_id = that.msg.id
              // find() 方法返回数组中满足提供的测试函数的第一个元素的值
              arr.find(function(){
                if (collect_id === that.msg.id) {
                  that.collect = true
                  that.collect_text = '取消收藏'
                }
              })
            },
            err => {
              console.log('err')
            });
    },
    toCollect(){
      let that = this
      this.$http
          .post('https://www.vue-js.com/api/v1/topic/collect', {accesstoken:that.accesstoken,topic_id:that.msg.id})
          .then(
            res => {
              that.collect_text = '取消收藏'
            },
            err => {
              console.log('err')
            });
    },
    deCollect(){
      let that = this
      this.$http
          .post('https://www.vue-js.com/api/v1/topic/de_collect', {accesstoken:that.accesstoken,topic_id:that.msg.id})
          .then(
            res => {
              that.collect_text = '收藏话题'
            },
            err => {
              console.log('err')
            });
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
  .topic{
    margin-top: 56px;
  }
  .table{
    background: #369219;
    padding: 2px 4px;
    color: #fff;
    font-size: 12px;
  }
  .topic-title{
    font-size: 22px;
    font-weight: 700;
  }
  .topic-inset{
    margin-left: 0;
  }
  .topic-item{
    display: inline-block;
  }
  .markdown-text h2{
    padding-bottom: 10px;
    margin-bottom: 1px solid black;
  }
  .topic-content {
      padding: 1rem;
      border-top: 1px solid #e5e5e5;
      margin-bottom: 2rem;
  }

  .topic-content h1,
  .topic-content h2,
  .topic-content h3,
  .topic-content h4,
  .topic-content h5,
  .topic-content h6 {
      font-weight: 700;
  }

  .topic-content p {
      font-size: 15px;
      line-height: 1.7em;
      overflow: auto;
  }

  .topic-content h2 {
      font-size: 26px;
      margin: 30px 0 15px;
      border-bottom: 1px solid #eee;
  }

  .topic-content h3 {
      margin: 30px 0 15px;
      border-bottom: 1px solid #eee;
      font-size: 24.5px;
  }

  .topic-content pre {
      font-family: Monaco, Menlo, Consolas, "Courier New", monospace;
      font-size: 14px;
      border-radius: 0;
      padding: 1rem;
      border: 0;
      margin: 1rem 0;
      border-width: 1px 0;
      background: #f7f7f7;
  }

  .topic-content ul {
      list-style-type: disc;
      margin: 0 0 1rem 2rem;
  }

  .topic-content ol {
      list-style: decimal;
      margin-left: 2em;
  }

  .topic-content li {
      line-height: 2.5rem;
  }

  .topic-content a {
      display: block;
  }

  .topic-content img {
      height: auto;
      max-width: 100%;
      vertical-align: middle;
      border: 0;
  }
  /*ul{
    list-style: disc;
  }*/
  /*
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
  }*/
</style>
