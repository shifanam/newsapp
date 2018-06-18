import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import logo from '@/components/logo'
import search from '@/components/search'
import model from '@/components/model'
import work from '@/components/work'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'logo',
      component: logo
    },
    {
      path: '/main',
      name: 'main',
      component: main
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/model',
      name: 'model',
      component: model
    },
    {
      path: '/w',
      name: 'work',
      component: work
    }
  ]
})
