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
      redirect: '/public/content/word-book',
      name: 'public',
      component: resolve => require(['@/components/public.vue'], resolve),
      children: [
        {
          path: 'content',
          components: {
            default: resolve => require(['@/components/content-module/content-module.vue'], resolve),
            'nav-bar': resolve => require(['@/components/nav-bar/nav-bar.vue'], resolve)
          },
          children: [
            {
              path: 'word-book',
              name: 'word-book',
              component: resolve => require(['@/components/word-book/word-book.vue'], resolve),
              meta: {
                requireAuth: true,
                menuShow: true,
                menuName: '单词本'
              }
            }, {
              path: 'essay',
              name: 'essay',
              component: resolve => require(['@/components/essay/essay.vue'], resolve),
              meta: {
                requireAuth: true,
                menuShow: true,
                menuName: '文章'
              }
            }, {
              path: 'painting',
              name: 'painting',
              component: resolve => require(['@/components/painting/painting.vue'], resolve),
              meta: {
                requireAuth: true,
                menuShow: true,
                menuName: '画'
              }
            }, {
              path: 'user-manage',
              name: 'user-manage',
              component: resolve => require(['@/components/user-manage/user-manage.vue'], resolve),
              meta: {
                requireAuth: true,
                menuShow: true,
                menuName: '用户管理'
              }
            }, {
              path: 'log',
              name: 'log',
              component: resolve => require(['@/components/log/log.vue'], resolve),
              meta: {
                requireAuth: true,
                menuShow: true,
                menuName: '日志'
              }
            }
          ]
        }
      ]
    }
  ]
})
