<template>
  <van-button class="btn" @click="onLike" :loading="loading">
    <template #icon>
      <van-icon
        :name="isLike === 1 ? 'good-job' : 'good-job-o'"
        :color="isLike === 1 ? '#f9cc9d' : ''"
      ></van-icon>
    </template>
  </van-button>
</template>

<script>
import { deleteLike, addLike } from '@/api/article'
export default {
  model: {
    prop: 'isLike',
    event: 'changeLike'
  },
  props: {
    isLike: {
      type: Number
    },
    artId: {
      type: [Number, String]
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onLike() {
      try {
        this.loading = true
        // 判断是否是是已经点赞状态
        if (this.isLike === 1) {
          // 已经点赞 >> 取消点赞
          await deleteLike(this.artId)
          this.$emit('changeLike', -1)
          this.$toast('取消收藏')
        } else {
          // 没有点赞 >> 去点赞
          await addLike(this.artId)
          this.$emit('changeLike', 1)
          this.$toast('收藏成功')
        }
        this.loading = false
      } catch (e) {
        this.loading = false
        this.$toast('加载失败，请重试！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.btn {
  border: none;
}
</style>
