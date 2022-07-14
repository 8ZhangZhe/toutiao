<template>
  <div>
    <h1>dome</h1>
    <hr />
    <h4>{{ count }}</h4>
    <h5>{{ $store.state.userInfo.name }}</h5>
    <van-button @click="changount">点击count++</van-button>
    <van-button @click="changeName">点击修改名字</van-button>
    <van-field class="input" v-model.number="num"></van-field>
    <van-button @click="change2">点击+输入的值</van-button>
  </div>
</template>

<script>
// 1. mapState 快速获取 vuex state状态的方法，引入
import { mapState } from 'vuex'

export default {
  data () {
    return {
      num: ''
    }
  },
  // 2. store 仓库的状态通过 mapState 映射到当前数组可以直接使用
  // 3. 用法： this.count   this.userInfo
  computed: {
    ...mapState(['count'])
  },
  methods: {
    changount () {
      this.$store.commit('changecount')
    },
    changeName () {
      this.$store.commit('changename')
    },
    change2 () {
      this.$store.commit('change2', this.num)
    }
  }

}
</script>

<style>
.input{
  border: 1px solid black;
}
</style>
