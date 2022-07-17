import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 第一种 直接引入登录组件 同步加载路由（按需）
// 只要页面一刷新，所有的页面数据全部一次性加载
// import Login from '@/views/Login'

// 第二种 直接写函数 () => import('@/views/Login')
// 路由的懒加载，访问到一个路由的时候再去加载当前路由文件
const routes = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    name: 'dome',
    path: '/dome',
    component: () => import('@/views/dome.vue')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    component: () => import('@/views/article/index.vue'),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true
  },
  {
    path: '/user/profile',
    component: () => import('@/views/user-profile')
  },
  {
    path: '/MyTest',
    component: () => import('@/views/MyTest/index.vue')
  }
]

// 登录的组件和路由
const router = new VueRouter({
  routes
})

export default router
