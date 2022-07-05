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
  }
]

// 登录的组件和路由
const router = new VueRouter({
  routes
})

export default router
