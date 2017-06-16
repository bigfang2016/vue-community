<template lang="html">
    <mu-appbar title="Vue.js 中文社区">
      <mu-icon-button slot="left">
          <img class="logo" src="../../assets/logo.png">
      </mu-icon-button>
      <mu-icon-menu
        icon="more_vert"
        slot="right"
        :value="theme"
        @change="changeTheme"
      >
        <mu-menu-item title="LIGHT" value="light" />
        <mu-menu-item title="DARK" value="dark" />
        <mu-menu-item title="CARBON" value="carbon" />
        <mu-menu-item title="TEAL(DEFAULT)" value="teal" />
      </mu-icon-menu>
    </mu-appbar>
</template>

<script>
// 动态的切换主题,需要依赖 webpack 的 raw-loader 加载器
import light from '!raw-loader!muse-ui/dist/theme-default.css'
import dark from '!raw-loader!muse-ui/dist/theme-dark.css'
import carbon from '!raw-loader!muse-ui/dist/theme-carbon.css'
import teal from '!raw-loader!muse-ui/dist/theme-teal.css'
export default {
    data() {
        return {
            theme: 'teal',
            themes: {
                light,
                dark,
                carbon,
                teal
            }
        }
    },
    methods: {
        changeTheme(theme) {
            this.theme = theme
            const styleEl = this.getThemeStyle()
            styleEl.innerHTML = this.themes[theme] || ''
        },
        getThemeStyle() {
            const themeId = 'muse-theme'
            let styleEl = document.getElementById(themeId)
            if (styleEl) return styleEl
            styleEl = document.createElement('style')
            styleEl.id = themeId
            document.body.appendChild(styleEl)
            return styleEl
        }
    }
}
</script>

<style scoped>
  .mu-appbar{
    border-bottom: solid 1px rgb(83,163,157);
    position: fixed;
    top: 0;
  }
  .mu-appbar .mu-appbar-title{
      text-align: center;
  }
  .logo {
      height: 45px;
  }
  .mu-icon-button{
      padding: 0.4rem;
  }
</style>
