<template>
  <van-button class="btn" @click="onCollected" :loading="loading">
    <template #icon>
      <van-icon
        :name="isCollected ? 'star' : 'star-o'"
        :color="isCollected ? '#f9cc9d' : ''"
      ></van-icon>
    </template>
  </van-button>
</template>

<script>
import { deleteCollect, addCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  model: {
    prop: 'isCollected',
    event: 'changeCollected'
  },
  props: {
    isCollected: {
      type: Boolean
      // required: true
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
    async onCollected() {
      this.loading = true
      try {
        // 判断是否是已经收藏状态
        if (this.isCollected) {
          // 已收藏 >> 取消收藏
          await deleteCollect(this.artId)
          // console.log(this.artId)
        } else {
          // 没有收藏  >> 去收藏
          await addCollect(this.artId)
        }
        this.$emit('changeCollected', !this.isCollected)
        this.$toast(this.isCollected ? '取消收藏' : '收藏成功')
        this.loading = false
      } catch (e) {
        this.loading = false
        this.$toast('加载失败，请重试！')
      }
    }
  },
  created() {}
}
</script>

<style scoped lang="less">
.btn {
  border: none;
}
</style>
