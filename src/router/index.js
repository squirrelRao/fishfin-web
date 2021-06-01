import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/user/login'
import regist from '@/views/user/regist'
import index from '@/views/index'
import focus from '@/views/center/focus'
import simulation from '@/views/center/simulation'
import simulation_detail from '@/views/center/simulation_detail'
import center_head from '@/views/center/center_head'
import footer from '@/views/footer'
import store from '@/store/index'

Vue.use(Router)

const router =  new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'index',
      components: {
        main:index,
        footer:footer
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
        main:focus,
        footer:footer

      }
    },
    {
      path: '/center/simulation',
      name: 'simulation',
      components: {
        header:center_head,
        main:simulation,
        footer:footer

      }
    },
    {
      path: '/center/simulation_detail/:id',
      name: 'simulation_detail',
      components: {
        header:center_head,
        main:simulation_detail,
        footer:footer

      }
    }
  ]
})

router.beforeEach((to, from, next) => {
   store.commit("getUserState");
   next();
})


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}


export default router;

