<template>
  <div class="box">
    <h3>1688进货红包111111111</h3>
    <card-test
      class="mytest"
      v-for="(item, index) in list"
      :key="index"
      :item="item"
    ></card-test>
  </div>
</template>

<script>
import { getTestInfo } from '@/api/test'
import cardTest from './cardTest.vue'
export default {
  components: { cardTest },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await getTestInfo()
      console.log(res)
      this.list = res.data.list
    }
  }
}
</script>

<style scoped lang="less">
.box {
  h3 {
    font-size: 45px;
  }
  card-test {
    margin-bottom: 22px;
  }
}
</style>
