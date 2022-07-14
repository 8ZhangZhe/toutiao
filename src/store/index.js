import { setStorage, getStorage } from '@/utils/storage'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const tokenKey = 'toutiao_token'
export default new Vuex.Store({
  // 用于存储全局状态数据
  state: {
    user: getStorage(tokenKey) // 存储 token 数据的
  },
  getters: {},
  // 修改状态的唯一入口
  // 只允许有同步状态
  mutations: {
    // 修改state里面的user数据的方法
    setUser (state, user) {
      // 存储到vuex中
      state.user = user
      // 存储到本地存储
      setStorage(tokenKey, user)
    }
  },
  // 异步状态修改
  actions: {},
  modules: {}
})

// vuex 全局状态管理工具
// 解决跨组件传智混乱的问题
// state 定义仓库的组昂头
// 第一种获取数据的方法： $store 可以直接获取仓库状态
// 第二种获取数据的方法： mapState([...'key']) 仓库状态 >> 组件中
// 修改数据： >> $store.commit('') 触发 mutations 修改 state
