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
        <mu-checkbox v-if="accesstoken" :label="collect_text" class="demo-checkbox" uncheckIcon="favorite_border" checkedIcon="favorite" v-model="collect"/> <br/>
        <!-- <mu-raised-button  class="demo-raised-button" :icon="collect_icon" /> -->
      <mu-divider inset class="topic-inset"/>
      <div class="topic-content"></div>
    </mu-list>
      <!-- 评论区 -->
      <ul v-if="msg.replies.length" class="replies">
          <li>{{msg.replies.length}}条回复</li>
          <li class="reply" v-for="(val,index) in msg.replies" :key="val.id">
              <section class="msg">
                  <div class="author">
                      <router-link
                      :to="{path:'/user',query:{user:val.author.loginname}}"
                      :src="val.author.avatar_url"
                      tag="img"
                      alt="user">
                      </router-link>
                      <span class="name">{{val.author.loginname}}</span>
                      <span class="timer">{{index+1}}楼 • {{val.create_at | timeago}}</span>
                  </div>
                  <!-- 未登录状态下点赞 -->
                  <div @click="open" v-if="val.ups.length && !accesstoken" class="ups">
                      <mu-icon value="thumb_up" :size="16" />
                      <span>{{val.ups.length}}</span>
                  </div>
                  <!-- 登录状态下点赞 -->
                  <div @click="open" v-if="accesstoken" class="ups">
                      <mu-icon @click="like(index)" value="thumb_up" :size="16" />
                      <span>{{val.ups.length}}</span>
                      <mu-icon @click="changeReply(index)" class="textsms" value="reply" :size="22" />
                  </div>
              </section>
              <p v-html="val.content"></p>
              <div v-if="accesstoken" class="reply_show" v-show="val.reply_show">
                  <textarea v-model="single_reply" class="reply" placeholder="请输入回复内容..." rows="5"></textarea>
                  <mu-raised-button @click="single_reply_content(index)" label="回复" class="demo-raised-button" primary/>
                  <mu-raised-button @click="exit_single_reply_content(index)" label="取消" class="demo-raised-button" primary/>
              </div>
          </li>
      </ul>
      <ul v-if="accesstoken" class="replies">
          <li>添加回复</li>
          <li>
              <textarea v-model="reply" class="reply" placeholder="请输入回复内容..." rows="5"></textarea>
              <mu-raised-button @click="reply_content" label="回复" class="demo-raised-button" primary/>
          </li>
      </ul>
      <mu-dialog v-if="!accesstoken" :open="dialog" title="提示：" @close="close">
          请先登录，登录后即可点赞。
          <mu-flat-button slot="actions" @click="close" primary label="取消" />
          <mu-flat-button to="/login" slot="actions" @click="close" primary label="确定" />
      </mu-dialog>
      <mu-dialog :open="isReply" title="提示：" @close="close">
          {{tips}}
          <mu-flat-button slot="actions" @click="close" primary label="确定" />
      </mu-dialog>




  </div>
</template>

<script>
import Vue from 'vue'
import timeago from 'timeago.js'
export default {
  data () {
    return {
      msg: {
        author:{loginname:''},
        replies:{}
      },
      accesstoken: '',
      loginname:'',//储存登录者的用户名
      collect_text:'收藏话题',
      collect: false,
      dialog: false,
      reply: '',
      single_reply: '',
      isReply: false,
      tips: ''

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
              this.collect_text = '取消收藏'
          } else {
              this.deCollect()
              this.collect_text = '收藏主题'
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
            },
            err => {
              console.log('err')
            });
      if(this.accesstoken){
          this.isCollected()
      }
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
              arr.find(function(item){
                if (collect_id === item.id) {
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
              // that.collect_text = '取消收藏'
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
              // that.collect_text = '收藏话题'
            },
            err => {
              console.log('err')
            });
    },
    open() {
        this.dialog = true
    },
    close() {
        this.dialog = false
        this.isReply = false
    },
    reply_content() {
        // 添加评论
        let id = this.$route.query.id
        let that = this
        this.$http
            .post('https://www.vue-js.com/api/v1/topic/' + id + '/replies', {
                accesstoken: that.accesstoken,
                content: that.reply
            })
            .then(
              res => {
                that.tips = '回复成功！'
                that.isReply = true
                setTimeout(function() {
                    that.isReply = false
                }, 1500)
                that.getDataByGet()
                that.reply = ''
            },
            err => {
              that.tips = '请输入回复内容...'
              that.isReply = true
              setTimeout(function() {
                  that.isReply = false
              }, 1500)
          });
    },
    like(index) {
        //点赞
        let that = this
        let reply_id = that.msg.replies[index].id
        this.$http
            .post('https://www.vue-js.com/api/v1/reply/' + reply_id + '/ups', {
                accesstoken: that.accesstoken
            })
            .then(
              res => {
                // console.log(response.msg)
                that.getDataByGet()
            })
    },
    single_reply_content(index) {
        // 对评论的回复
        let id = this.$route.query.id
        let that = this
        this.$http
            .post('https://www.vue-js.com/api/v1/topic/' + id + '/replies', {
                accesstoken: that.accesstoken,
                content: that.single_reply,
                reply_id: that.msg.replies[index].id
            })
            .then(
              res => {
                that.tips = '回复成功！'
                that.isReply = true
                setTimeout(function() {
                    that.isReply = false
                }, 1500)
                that.getDataByGet()
                that.single_reply = ''
            },
            err => {
                that.tips = '请输入回复内容...'
                that.isReply = true
                setTimeout(function() {
                    that.isReply = false
                }, 1500)
            }
          );

    },
    changeReply(index) {
        //点击对评论进行回复
        let arr = this.msg.replies
        arr.map(function(item, i) {
            index === i ? Vue.set(item, 'reply_show', true) : Vue.set(item, 'reply_show', false)
        })

        this.single_reply = '@' + this.msg.replies[index].author.loginname + ' '
    },
    exit_single_reply_content(index) {
        //取消对评论的回复，清空内容
        this.single_reply = ''
        let arr = this.msg.replies
        arr[index].reply_show = false
        Vue.set(arr, index, arr[index])
    }
  }
}
</script>

<style >
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
      text-align: left;
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

  /*评论区样式*/

.replies>li {
    padding: 1rem;
    text-align: left;
}

.replies>li:first-child {
    background-color: #f6f6f6;
}

.reply {
    border: 1px solid #f0f0f0;
    outline:none;
}

.reply>.msg {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
}

.reply>p {
    margin-bottom: 2rem;
}

.author>img {
    width: 3rem;
    height: 3rem;
    /*border-radius: 50%;*/
    vertical-align: top;
}

.author>.name {
    color: #666;
    font-weight: 700;
}

.author>.timer {
    color: #08c;
    /*font-weight: 700;*/
}

.msg>.ups {
    display: flex;
    align-items: center;
    color: #009688;
}

.ups>span {
    margin-left: 0.5rem;
}

.reply {
    width: 100%;
}

.textsms {
    margin-left: 1rem;
    color: #009688;
    height: 24px;
    font-size: 22px;
}

.reply_show {
    animation: reply_show 1s ease;
}

@keyframes reply_show {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
