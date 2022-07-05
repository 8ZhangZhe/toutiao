// 引入封装好的axios数据请求函数
import request from '@/utils/request'

// 封装 login 函数，请求登录数据接口，并暴露
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 发送短信验证码请求
export const getSmsCode = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
