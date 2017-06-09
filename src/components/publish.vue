<template lang="html">
  <div class="">
    <mu-appbar title="编辑话题">
      <mu-icon-button @click="goPublish" icon="near_me" slot="right"/>
    </mu-appbar>
    <mu-select-field v-model="game1" :labelFocusClass="['label-foucs']" label="选择板块：" class="select-input">
      <mu-menu-item v-for="text,index in list" :key="index" :value="index" :title="text" />
    </mu-select-field>
    <br/>
    <mu-text-field label="标题" hintText="标题字数10字以上"  class="title-input"/>
    <br/>
    <!-- <mu-content-block> -->
      <markdown-editor v-model="content" ref="markdownEditor" class="markdown-height"></markdown-editor>
    <!-- </mu-content-block> -->


    <personal></personal>
  </div>
</template>

<script>
import Personal from './layout/footer'
import { markdownEditor } from 'vue-simplemde'
export default {
  components:{Personal,markdownEditor},
  data () {
    return {
        game1: 0,
        game2: ['1'],
        game3: '3',
        list: ['请选择','weex', '分享', '问答', '招聘'],
        content: '',
        configs: {
          spellChecker: false, // 禁用拼写检查
          // toolbar: ['heading','bold', 'italic',  '|', 'code', 'quote', 'unordered-list', 'ordered-list', '|', 'link', 'image', '|', 'preview', '|', 'guide'],
          // toolbar:[{
          //   name: 'code',
          //   action: SimpleMDE.toggleCodeBlock,
          //   className: 'fa fa-code',
          //   title: '代码块'
          // }]
        }
      }
  },
  mounted () {

    this.getscroll()
  },
  methods:{
    goPublish(){

    },
    getscrollTop(){
      // let scroll = this.$refs.markdownEditor.scrollTop
    },
    getscroll(){
      console.log(this.$refs.markdownEditor)
      // this.$refs.markdownEditor.addEventListener('scroll', this.getscrollTop)
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
  }
  .title-input{
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 10px;
    margin-right: 10px;
    width: 90%;
  }
  /*.markdown-height{
    max-height: 200px;
    overflow-y: auto;
  }*/
  .markdown-editor .CodeMirror, .markdown-editor .CodeMirror-scroll {
  height: 100px;
  max-height: 100px;
  min-height: 100px;
  overflow-y: auto;
  z-index: -1;
}
</style>
