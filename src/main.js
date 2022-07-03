import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import './styles/index.less'

// 全局注册 <toutiao/> 组件,把图标封装成组件，通过传参使用
import TouTiao from '@/components/TouTiao.vue'
Vue.component('TouTiao', TouTiao)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
