import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import Content from '@/components/layout/content'
import All from '@/components/all'
import Details from '@/components/details'
import User from '@/components/user'
import Publish from '@/components/publish'
import Message from '@/components/message'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
        path: '/',
        name: 'layout',
        components: {
            Header,
            Content,
            Footer
        }
    },
    {
        path: '/details',
        name: 'details',
        component: Details
    },
    {
        path: '/user',
        name: 'user',
        component: User
    },
    {
        path: '/message',
        name: 'message',
        component: Message
    },
    {
        path: '/publish',
        name: 'publish',
        component: Publish
    }

  ]
})
