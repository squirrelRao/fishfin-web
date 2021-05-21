// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import _api from './libs/api'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.prototype.$api = _api


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<app/>'
})


