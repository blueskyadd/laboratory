import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loging',
      component:() => import('@/view/LabManager/loging/index'),
    },
    {
      path: '/index',
      name: 'index',
      component:() => import('@/view/LabManager/index/index'),
    }
  ]
})
