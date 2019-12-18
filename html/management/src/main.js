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

//  路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    if (localStorage.token) { // 判断当前的token是否存在 ； 登录存入的token
      console.log('token存在')
      next()
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
