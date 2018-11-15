import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Ranking from '@/components/Ranking'
import EventRegistration from '@/components/EventRegistration'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
     {
    path: '/Ranking',
    name: 'Ranking',
    component: Ranking
    },
    {
      path: '/app',
      name: 'EventRegistration',
      component: EventRegistration
    }
  ]
})
