import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '@/views/user/login'

Vue.use(Router)

const router =  new Router({
  mode: "history",
  routes: [
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

