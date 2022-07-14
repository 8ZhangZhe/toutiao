<template>
  <div>
    <!-- 1111 -->
    <van-cell title="历史记录">
      <template #default>
        <template v-if="isDeleteStatus">
          <van-tag class="btn" type="danger" @click="deleteAll"
            >全部删除</van-tag
          >
          <van-tag class="btn" type="success" @click="isDeleteStatus = false"
            >完成</van-tag
          >
        </template>
        <van-icon
          name="delete"
          v-else
          @click="isDeleteStatus = true"
        ></van-icon>
      </template>
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistory"
      :key="index"
      :title="item"
      @click="clickHistoryItem(item, index)"
    >
      <template #default>
        <van-icon name="clear" v-if="isDeleteStatus"></van-icon>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  // 接收父组件传过来的历史记录数组，用来遍历渲染
  props: {
    searchHistory: {
      type: Array
    }
  },
  data() {
    return {
      // 历史记录列表是否显示
      isDeleteStatus: false
    }
  },
  methods: {
    // 删除全部功能
    deleteAll() {
      // 手动触发父组件自定义事件 deleteAll，由父组件清空历史记录列表
      this.$emit('deleteAll')
    },
    // 点击历史记录列表项时触发功能
    clickHistoryItem(item, index) {
      // 点击了历史项的时候
      // 判断当前是否处于删除编辑状态
      if (this.isDeleteStatus) {
        // 是，删除这一项
        this.searchHistory.splice(index, 1)
      } else {
        // 不是，去搜索，触发父组件自定义事件 onSearch
        this.$emit('onSearch', item)
      }
    }
  }
}
</script>

<style scoped lang="less">
.btn {
  margin-right: 10px;
}
</style>
