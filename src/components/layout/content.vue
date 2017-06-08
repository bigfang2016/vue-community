<template>
<div class="content">
  <mu-tabs :value="activeTab" @change="handleTabChange" >
    <mu-tab value="all" title="全部" />
    <mu-tab value="good" title="精华" />
    <mu-tab value="weex" title="weex" />
    <mu-tab value="share" title="分享" />
    <mu-tab value="ask" title="问答" />
    <mu-tab value="job" title="招聘" />
  </mu-tabs>

  <mu-list>
    <template v-for="(val,index) in msgArr">
      <div class="list clearfix">
        <router-link :to="{path:'/user', query:{user:val.author.loginname}}" class="link">
          <div class="list-left">
            <img class="author" :src="val.author.avatar_url" alt="">
          </div>
        </router-link>
        <router-link :to="{name:'details'}" class="link">
          <div class="list-right">
            <span v-if="val.top" class="table">置顶</span>
            <span v-else-if="val.good" class="table">精华</span>
            <span v-else-if="val.tab === 'share'" class="table" style="background:#999">分享</span>
            <span v-else-if="val.tab === 'ask'" class="table" style="background:#999">问答</span>
            <span v-else-if="val.tab === 'job'" class="table" style="background:#999">招聘</span>
            <span class="title" style="font-size: 16px;font-weight:500;">{{val.title}}</span>
            <p class="count">
              <span><span style="color: rgba(158, 120, 192, 1);font-weight: 600;">{{val.reply_count}}</span>/ {{val.visit_count}}</span>
              <span class="date">{{val.last_reply_at | timeago}}</span>
            </p>
          </div>
        </router-link>
      </div>
      <mu-divider inset/>
    </template>

  </mu-list>
  <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
</div>
</template>

<script>
import timeago from 'timeago.js'
export default {
  data () {
    return {
      activeTab: 'all',
      msgArr : [],
      page: 1,
      loading: false,
      scroller: null
    }
  },
  created() {
    this.getDataByGet()
  },
  mounted () {
    this.scroller = this.$el
    console.log(this.scroller)
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
      this.getDataByGet()
    },
    //请求数据
    getDataByGet() {
      this.$http
          .get('https://www.vue-js.com/api/v1/topics',{params:{tab:this.activeTab,page:this.page}})
          .then(
            res => {
              let arr = res.data.data
              let len = arr.length
              this.msgArr = []
              for(let i = 0; i < len; i++){
                this.msgArr.push(arr[i])
              }
            },
            err => {
              console.log(err)
            });
    },
    loadMore() {
      console.log(hahhh)
      this.loading = true
      setTimeout(() => {
        this.page += 1
        this.getDataByGet()

        this.loading = false
      }, 2000)
    }

  }
}
</script>

<style scoped>
  .content{
    overflow: auto;
  }
  .mu-tabs{
    position: fixed;
    top: 56px;
  }
  .mu-list{
    margin-top: 104px;
    margin-bottom: 47px;
  }
  .mu-list:last-child{

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
  }
  .list-right{
    float: right;
    width: 80%;
  }
  .author{
    width: 40px;
    height:40px;
    border-radius: 40px;
  }
  .list-right .table{
    background: #369219;
    padding: 2px 4px;
    color: #fff;
    font-size: 12px;
  }
  .list-right .count{
    display: flex;
    justify-content: space-between;
  }
  .link{
    color: rgb(44,62,80);
  }
</style>
