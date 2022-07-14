import request from '@/utils/request'

// 获取频道数据的接口
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

// 获取所有频道数据接口
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

// 更新用户已登录状态下，我的频道添加更新数据请求
export const getAddChannels = (channel) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 获取删除我的频道接口数据请求
export const deleteUserChannel = (channelId) => {
  return request({
    url: `/v1_0/user/channels/${channelId}`,
    method: 'DELETE'
  })
}
