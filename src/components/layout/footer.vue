<template lang="html">
    <mu-paper>
      <mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item value="home" title="首页" icon="home"/>
        <mu-bottom-nav-item value="publish" title="发布" icon="assignment"/>
        <mu-bottom-nav-item value="message" title="消息" icon="message"/>
        <mu-bottom-nav-item value="mine" title="我的" icon="account_circle"/>
      </mu-bottom-nav>
    </mu-paper>
</template>

<script>
export default {
  data () {
    return {
      bottomNav: 'home'
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    }
  }
}
</script>

<style scoped>
    .mu-paper{
        position: absolute;
        bottom: 0;
    }
</style>
