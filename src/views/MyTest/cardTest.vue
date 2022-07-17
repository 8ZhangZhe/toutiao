<template>
  <div class="test">
    <div class="card">
      <div class="left">
        <span>{{ item.money }}</span
        >元
      </div>
      <div class="center">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <!-- 有倒计时盒子 -->
        <div class="time" v-if="item.restTime ? true : false">
          <span>距结束</span>
          <div>{{ parseInt(item.restTime / 3600) }}</div>
          :
          <div>{{ parseInt((item.restTime % 3600) / 60) }}</div>
          :
          <div>{{ parseInt((item.restTime % 3600) % 60) }}</div>
        </div>
        <!-- 无倒计时盒子 -->
        <div class="time2" v-else>
          <span>有效期:</span>
          <span
            >{{ item.time[0] | filterTime }}-{{
              item.time[1] | filterTime
            }}</span
          >
        </div>
      </div>

      <div class="right">{{ item.status }}</div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'MyTest',
  props: ['item'],
  data() {
    return {
      isRestTime: false
    }
  },
  // dayjs时间格式过滤器
  filters: {
    filterTime(value) {
      return dayjs(value).format('MM.DD HH:mm')
    }
  },
  created() {
    const MyTimer = setInterval(() => {
      this.item.restTime -= 1
      if (this.item.restTime === 0) {
        clearInterval(MyTimer)
      }
    }, 1000)
  }
}
</script>

<style scoped lang="less">
.test {
  margin-bottom: 22px;
  .card {
    background: url(@/assets/bgimg.png) no-repeat top;
    background-size: 100%;

    width: 690px;
    height: 182px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-right: 16px;
    margin: 0 auto;
    .left {
      color: #a45927;
      // text-align: center;
      width: 180px;
      height: 64px;
      font-size: 30px;
      margin-left: 15px;
      span {
        font-size: 60px;
        font-weight: 700;
      }
    }
    .center {
      // margin-left: 20px;
      color: #ffe9b0;
      .time2 {
        span {
          font-size: 8px;
          margin: 0;
        }
      }
      h3 {
        font-size: 40px;
        margin: 0;
      }
      p {
        font-size: 14px;
        margin: 2px 0 20px;
      }
      .time {
        display: flex;
        font-size: 18px;
        div {
          background-color: #fff1cc;
          text-align: center;
          margin: 0 8px;
          color: red;
          width: 34px;
          height: 34px;
          line-height: 34px;
        }
      }
    }
    .right {
      // margin-left: 20px;
      text-align: center;
      width: 120px;
      height: 64px;
      background-color: #ffe0b2;
      color: #a45927;
      border-radius: 32px;
      font-size: 32px;
      font-weight: 700;
      line-height: 64px;
      // line-height: 40px;
    }
  }
}
</style>
