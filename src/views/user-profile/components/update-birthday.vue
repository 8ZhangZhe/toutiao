<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="getConfirm"
      @cancel="getCancel"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { updateUserProfile } from '@/api/user'
export default {
  props: ['value'],
  data() {
    return {
      minDate: new Date(1900, 1, 1),
      currentDate: this.value,
      maxDate: new Date()
    }
  },
  methods: {
    async getConfirm(value) {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中'
      })
      const currentDate = dayjs(value).format('YYYY - MM - DD')
      try {
        await updateUserProfile({
          birthday: currentDate
        })
        this.$emit('input', currentDate)
        this.$emit('closeBirthday')
        this.$toast('修改生日成功')
      } catch (e) {
        this.$toast('修改生日失败')
      }
    },
    getCancel() {
      this.$emit('closeBirthday')
    }
  }
}
</script>

<style></style>
