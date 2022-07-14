<template>
  <van-button
    v-if="!isFollowed"
    @click="follow"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="isFollowLoading"
    >关注</van-button
  >
  <van-button
    :loading="isFollowLoading"
    @click="follow"
    v-else
    class="follow-btn"
    round
    size="small"
    >已关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  // 组价添加v-model
  // 1、把值通过value属性传递给子组件 >> 子组件可以用props(value)属性接收传过来的值
  // 2、提供子组件一个input事件 >> 修改v-model后面的值
  model: {
    prop: 'isFollowed', // key >> value >> 自定义接收父组件的值的名字
    event: 'changeFollowed' // 父组件通过v-model传过来的自定义事件的名字
  },
  props: {
    // 是否关注了
    isFollowed: {
      type: Boolean,
      required: true
    },
    // 用户ID
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      isFollowLoading: false
    }
  },
  methods: {
    // 点击关注或取消关注触发事件
    async follow() {
      this.isFollowLoading = true
      try {
        // 调用接口，关注/取关 当前作者
        if (this.isFollowed) {
          // 取消关注
          await deleteFollow(this.userId)
        } else {
          // 去关注
          await addFollow(this.userId)
        }
        // 让当前关注状态取反
        // this.isFollowed = !this.isFollowed
        this.$emit('changeFollowed', !this.isFollowed)
        // 关注之后进行提示
        this.$notify({
          type: 'success',
          message: this.isFollowed ? '关注成功' : '取消关注'
        })

        this.isFollowLoading = false
      } catch (e) {
        console.log(e)
        // 请求失败，提示
        this.$notify({
          type: 'danger',
          message: '操作失败'
        })
        this.isFollowLoading = false
      }
    }
  }
}
</script>

<style></style>
