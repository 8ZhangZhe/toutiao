// 配置axios实例
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

// 创建一个axios实例
// 通过axios创建出来的实例跟axios一样
// 但是集成了一些配置，带有根路径
const request = axios.create({
  baseURL: 'http://42.192.129.12:8000',
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [
    function (data) {
      // data  JSON 格式  >>  里面可能包含大数字
      // 如果转换成功则返回转换的数据结果
      try {
        return JSONBig.parse(data)
        // 如果转换失败，则包装为统一数据格式并返回
      } catch (e) {
        return data
      }
    }
  ]
})

// 设置请求拦截器
// 对请求头进行统一添加
request.interceptors.request.use(
  (config) => {
    // config >> 当前配置项
    // 设置token
    const token = store.state?.user?.token
    // 判断token是否存在
    // 存在 >> 添加请求头
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 设置响应拦截器
request.interceptors.response.use()

// 向外暴露
export default request
