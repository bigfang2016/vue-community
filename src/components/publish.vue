<template lang="html">
  <div class="">
    <mu-appbar title="编辑话题">
      <mu-icon-button @click="goPublish" icon="near_me" slot="right"/>
    </mu-appbar>
    <!-- 判断是否需要登录 -->
    <mu-dialog :open="!accesstoken" title="" >
      请先登录
      <mu-flat-button slot="actions" primary @click="toHome" label="取消"/>
      <mu-flat-button slot="actions" primary @click="toLogin" label="确定"/>
    </mu-dialog>

    <mu-select-field v-model="game" :labelFocusClass="['label-foucs']" label="选择板块：" class="select-input">
      <mu-menu-item v-for="text,index in list" :key="index" :value="index" :title="text" />
    </mu-select-field>
    <br/>
    <mu-text-field v-model="title" label="标题" hintText="标题字数10字以上"  class="title-input"/>
    <br/>
    <!-- 内容区域，markdown格式 -->
    <markdown-editor v-model="content" ref="markdownEditor" class="markdown" :configs="configs"></markdown-editor>
    <personal></personal>
    <!-- 判断是否发布成功 -->
    <mu-dialog :open="success" title="" >
      发布成功
      <mu-flat-button slot="actions" primary @click="toHome" label="确定"/>
    </mu-dialog>
  </div>
</template>

<script>
import Personal from './layout/footer'
import { markdownEditor } from 'vue-simplemde'
export default {
  components:{
      Personal,
      markdownEditor
  },
  data () {
    return {
        game: 0,
        list: ['分享', '问答', '招聘'],
        accesstoken:'',
        tab:'',
        title:'',
        content: '',
        success: false,
        configs: {
          spellChecker: false, // 禁用拼写检查
        //   initialValue: 'hellow', // 设置初始值
          status: false, // 禁用底部状态栏
          toolbar: ['heading','bold', 'italic',  '|', 'code', 'quote', 'unordered-list', 'ordered-list', '|', 'link', 'image', '|', 'preview', '|', 'guide'],
          renderingConfig: {
            codeSyntaxHighlighting: true, // 开启代码高亮
            // highlightingTheme: 'atom-one-light' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
          }
        }
      }
  },
  created() {
      this.accesstoken = localStorage.getItem("accesstoken")
  },
  mounted () {
    this.setContheight()
    this.success = false
  },
  methods:{
    goPublish(){
      //此处game 就是lists里的每一项
      if (this.game === 0) {
          this.tab = 'share'
      } else if (this.game === 1) {
          this.tab = 'ask'
      } else if (this.game === 2) {
          this.tab = 'job'
      }
      let that = this
      this.$http
          .post('https://www.vue-js.com/api/v1/topics',{accesstoken: that.accesstoken,title:this.title,tab:this.tab,content:this.content})
          .then(
            res => {
              that.title = ''
              that.content = ''
              that.success = true
            },
            err => {
              console.log(err)
            });
    },
    toHome () {
      this.$router.push({path:'/'})
    },
    toLogin () {
      this.$router.push({path:'/login'})
    },
    setContheight(){
      let CodeMs = document.querySelector('.CodeMirror-scroll')
      let CodeM = document.querySelector('.CodeMirror')
      let viewport_height = document.documentElement.clientHeight;
      console.log(viewport_height);
      CodeMs.style.height = viewport_height - 384 +'px'
      CodeMs.style.minHeight = viewport_height - 384 +'px'
      CodeM.style.height = viewport_height - 362 +'px'
      CodeM.style.minHeight = viewport_height - 362 +'px'
    }
  }
}
</script>

<style scoped>
.mu-appbar{
  position: fixed;
  top: 0;
}
  .select-input{
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 66px;
    width: 90%;
    text-align: left;
  }
  .title-input{
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 10px;
    margin-right: 10px;
    width: 90%;
  }
  .markdown{
      width: 90%;
      margin-left: 5%;
  }
</style>
