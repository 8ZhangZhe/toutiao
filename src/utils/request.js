// 配置axios实例
import axios from 'axios'

// 创建一个axios实例
// 通过axios创建出来的实例跟axios一样
// 但是集成了一些配置，带有根路径
const request = axios.create({
  baseURL: 'http://42.192.129.12:8000'
})

export default request
