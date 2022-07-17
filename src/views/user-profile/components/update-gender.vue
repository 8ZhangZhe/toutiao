<template>
  <div>
    <van-picker
      title="修改性别"
      :default-index="value"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  props: ['value'],
  data() {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    // 点击确定按钮时触发
    async onConfirm(value) {
      this.$emit('closeGender')
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中'
      })
      try {
        await updateUserProfile({
          gender: value === '男' ? 1 : 0
        })
        this.$emit('input', value === '男' ? 1 : 0)
        this.$toast('修改性别成功')
      } catch (e) {
        this.$toast('修改性别失败')
      }
    },
    // 点击取消按钮时触发
    onCancel() {
      this.$emit('closeGender')
      this.$toast('取消')
    }
  }
}
</script>

<style scoped lang="less"></style>
