<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
// api封装好的请求搜索结果方法
import { getSearch } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  // 接收父组件传来的输入框搜索内容,用来传参给服务器请求搜索结果
  props: {
    searchText: {
      type: String
    }
  },
  data() {
    return {
      list: [], // 搜索结果列表数组
      loading: false, // 控制触底加载开启，一加载自动变为true，就不能加载了
      finished: false, // 默认为false就还可以继续加载，为true就不再进行请求加载了
      page: 1, // 默认当前页码为1，从1 开始
      perPage: 10 // 每次请求10条数据
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 请求搜索结果数据函数，携带参数，调用封装好的请求方法
    async onLoad() {
      const res = await getSearch({
        page: this.page, // 页码
        per_page: this.perPage, // 每页大小
        q: this.searchText // 搜索关键字
      })
      // console.log(res)
      // 解构请求来的数据数组，解构放进list数组
      this.list = [...this.list, ...res.data.data.results]
      this.loading = false // 开启加载新数据功能
      // 判断是返回的数据库里面是否还有数据，还有就页码+1，没有就结束加载
      if (res.data.data.results) {
        this.page++
      } else {
        this.finished = true
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }

      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    }
  }
}
</script>

<style scoped lang="less"></style>
