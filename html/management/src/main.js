// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入全局css样式
import './assets/css/public.css'

// 全局引入element-ui
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
import qs from 'qs'
Vue.prototype.$qs = qs

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$axios = axios

Vue.prototype.$axios = axios

Vue.use(ElementUi)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
