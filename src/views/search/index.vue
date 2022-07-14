<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult = false"
      />
    </form>
    <!-- /搜索框 -->
    <!-- 搜索结果组件 -->
    <search-result v-if="isShowResult" :searchText="searchText"></search-result>
    <!-- 搜索建议组件 -->
    <SearchSuggestion
      v-else-if="searchText"
      :searchText="searchText"
      @onSearch="onSearch"
    ></SearchSuggestion>
    <!-- 历史记录组件 -->
    <SearchHistory
      v-else
      :searchHistory="searchHistory"
      @onSearch="onSearch"
      @deleteAll="searchHistory = []"
    ></SearchHistory>
  </div>
</template>

<script>
import { HISTORYKEY } from '@/USERCHANNELKEY'
import { setStorage, getStorage } from '@/utils/storage'
import SearchHistory from '@/views/search/components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
export default {
  name: 'SearchPage',
  components: { SearchHistory, SearchSuggestion, SearchResult },
  props: {},
  data() {
    return {
      searchText: '', // 搜索框内容
      isShowResult: false, // 默认搜索结果页隐藏
      searchHistory: getStorage(HISTORYKEY) || [] // 搜索历史列表，从本地存储获取数据
    }
  },
  computed: {},
  watch: {
    // 搜索历史持久化
    // 监听了搜索历史记录的数据的变化
    // 发生变化的时候，把最新数据存到本地存储
    // 注意： 获取默认值的时候，从本地存储获取数据
    searchHistory(val) {
      setStorage(HISTORYKEY, val)
    }
  },
  created() {},
  methods: {
    // 确定搜索时触发，传参：搜索框里面的值 value: 当前输入的值
    onSearch(value) {
      // console.log(value)
      // 处理逻辑
      // （按下回车）isShowResult为true >> 搜索结果
      // （搜索框输入了值）seachText存在 & isResults为false >> 搜索建议
      // （默认）searchText不存在 && isResult为false >> 搜索历史
      // 搜索框再次聚焦，搜索结果隐藏
      console.log('开始搜索')
      // 把当前输入的值给到搜索框
      this.searchText = value
      // 搜索结果页展示
      this.isShowResult = true
      // 添加之前，先判断搜索结果是否已经存在于历史页
      const index = this.searchHistory.indexOf(value) // index = -1 不存在
      if (index !== -1) {
        // 找到了这项存在,把数组里面找到的这项删除，把最新的搜索关键词添加到数组最前面
        this.searchHistory.splice(index, 1)
      }
      // 把最新的搜索关键词添加到数组最前面
      this.searchHistory.unshift(value)
    },
    // 点击取消时触发
    onCancel() {
      // console.log('点击了取消')
      // 跳转到首页
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped></style>
