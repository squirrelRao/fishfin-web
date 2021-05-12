import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/user/login'
import regist from '@/views/user/regist'
import index from '@/views/index'
import focus from '@/views/center/focus'
import simulation from '@/views/center/simulation'
import simulation_detail from '@/views/center/simulation_detail'
import center_head from '@/views/center/center_head'

Vue.use(Router)

const router =  new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'index',
      components: {
        main:index
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        main:login
      }
    },
    {
      path: '/regist',
      name: 'regist',
      components: {
        main:regist
      }
    },
    {
      path: '/center/focus',
      name: 'center',
      components: {
        header:center_head,
        main:focus
      }
    },
    {
      path: '/center/simulation',
      name: 'simulation',
      components: {
        header:center_head,
        main:simulation
      }
    },
    {
      path: '/center/simulation_detail',
      name: 'simulation_detail',
      components: {
        header:center_head,
        main:simulation_detail
      }
    }
  ]
})


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}


export default router;

