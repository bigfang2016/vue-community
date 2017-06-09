import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Header from '@/components/layout/header'
import Content from '@/components/layout/content'
import Footer from '@/components/layout/footer'
import User from '@/components/user'
import Details from '@/components/details'
import Publish from '@/components/publish'
import Message from '@/components/message'
import Personal from '@/components/personal'
import Login from '@/components/login'

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
        path: '/user',
        name: 'user',
        component: User
    },
    {
        path: '/details',
        name: 'details',
        component: Details
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
    },
    {
        path: '/personal',
        name: 'personal',
        component: Personal
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }

  ]
})
