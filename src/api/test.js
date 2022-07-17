// 配置axios实例
import axios from 'axios'

export const getTestInfo = () => {
  return axios({
    url: 'https://systemjs.1688.com/krump/schema/1352.json'
  })
}
