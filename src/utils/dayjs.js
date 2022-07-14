import Vue from 'vue'
// 引入dayjs
import dayjs from 'dayjs'

// 引入中文语言包
import 'dayjs/locale/zh-cn'

// 引入相对时间的dayjs工具包
import relativeTime from 'dayjs/plugin/relativeTime'

// 使用中文包
dayjs.locale('zh-cn')

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 示例格式
// console.log(dayjs().format('YYYY-MM-DD'))
// console.log(dayjs().to(dayjs('1990-01-01')))

// 全局过滤器：处理相对时间
Vue.filter('relativeTime', (value) => {
  return dayjs().to(dayjs(value))
})
