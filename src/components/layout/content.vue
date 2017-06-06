<template>
<div>
  <mu-tabs :value="activeTab" @change="handleTabChange">
    <mu-tab value="tab1" title="全部"/>
    <mu-tab value="tab2" title="精华"/>
    <mu-tab value="tab3" title="weex"/>
    <mu-tab value="tab4" title="分享"/>
    <mu-tab value="tab5" title="问答"/>
    <mu-tab value="tab6" title="招聘"/>
  </mu-tabs>
  <div v-if="activeTab === 'tab1'">
    <h2>Tab One</h2>
    <p>
      这是第一个 tab
    </p>
  </div>
  <div v-if="activeTab === 'tab2'">
    <h2>Tab Two</h2>
    <p>
      这是第二个 tab
    </p>
  </div>
  <div v-if="activeTab === 'tab3'">
    <h2>Tab Three</h2>
    <p>
      这是第三个 tab
    </p>
  </div>
  <div v-if="activeTab === 'tab4'">
    <h2>Tab One</h2>
    <p>
      这是第四个 tab
    </p>
  </div>
  <div v-if="activeTab === 'tab5'">
    <h2>Tab Two</h2>
    <p>
      这是第五个 tab
    </p>
  </div>
  <div v-if="activeTab === 'tab6'">
    <h2>Tab Three</h2>
    <p>
      这是第六个 tab
    </p>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      activeTab: 'tab1'
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    }
  }
}
</script>

<style scoped>
</style>
