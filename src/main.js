import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import './styles/index.less'
// 引入注册vant
import Vant from 'vant'
// 引入vant样式
import 'vant/lib/index.less'

// 引入amfe-flexible
import 'amfe-flexible'

// 全局注册 <toutiao/> 组件,把图标封装成组件，通过传参使用
import TouTiaoIcon from '@/components/TouTiaoIcon.vue'

// 测试一下接口是否可用
import request from '@/utils/request'
request.get('/v1_0/channels').then((res) => {
  // console.log(res)
})

// 全局使用vant
Vue.use(Vant)
Vue.component('TouTiaoIcon', TouTiaoIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
