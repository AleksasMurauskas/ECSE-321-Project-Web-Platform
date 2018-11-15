import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import ActiveTrips from '@/components/ActiveTrips'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },

    {
      path: '/trips',
      name: 'ActiveTrips',
      component: ActiveTrips
    }
  ]
})
