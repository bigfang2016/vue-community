import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import Content from '@/components/layout/content'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
        path: '/',
        // name: 'Header',
        components: {
            Header,
            Content,
            Footer
        }
    }

  ]
})
