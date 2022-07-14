<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      icon="search"
      @click="hancleClick(item)"
    >
      <template #title>
        <div v-html="highLight(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: String
  },
  components: {},
  data() {
    return {
      list: []
    }
  },
  computed: {},
  watch: {
    // 监听搜索内容变化 >> 发送请求，获取搜索建议数据列表
    // handler:debounce(function() {}, awaitTime)
    searchText: {
      handler: debounce(function (value) {
        this.getSuggestion(value)
      }, 500),
      immediate: true // 开启首次加载监听
    }
  },
  created() {},
  mounted() {},
  methods: {
    hancleClick(item) {
      console.log(item)
      this.$emit('onSearch', item)
    },
    highLight(item) {
      // 构建替换正则表达式，g全局匹配，i忽略大小写
      const reg = new RegExp(this.searchText, 'gi')
      // 把获取到的搜索建议进行正则替换，替换成 标签+用户输入的内容 >> 实现高亮效果
      return item.replace(
        reg,
        `<span style="color:red">${this.searchText}</span>`
      )
    },
    async getSuggestion(q) {
      const res = await getSearchSuggestion(q)
      this.list = res.data.data.options
    }
  }
}
</script>

<style scoped lang="less"></style>
