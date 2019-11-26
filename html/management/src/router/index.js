import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/components/login/login.vue'], resolve)
    }, {
      path: '/public',
      redirect: '/public/content/admin-manage',
      name: 'public',
      component: resolve => require(['@/components/public.vue'], resolve),
      children: [
        {
          path: 'content',
          name: 'public',
          components: {
            default: resolve => require(['@/components/content-model/content-model.vue'], resolve),
            'nav-bar': resolve => require(['@/components/nav-bar/nav-bar.vue'], resolve),
            'bread-crumb': resolve => require(['@/components/bread-crumb/bread-crumb.vue'], resolve)
          },
          children: [
            {
              path: 'admin-manage',
              name: 'admin-manage',
              component: resolve => require(['@/components/admin-manage/admin-manage.vue'], resolve),
              meta: {
                menuShow: true,
                menuName: 'manage用户'
              }
            }, {
              path: 'user-manage',
              name: 'user-manage',
              component: resolve => require(['@/components/user-manage/user-manage.vue'], resolve),
              meta: {
                menuShow: true,
                menuName: 'user用户'
              }
            }
          ]
        }
      ]
    }
  ]
})
