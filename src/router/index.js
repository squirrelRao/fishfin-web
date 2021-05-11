import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/user/login'
import index from '@/views/index'

Vue.use(Router)

const router =  new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}


export default router;

