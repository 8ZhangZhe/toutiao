<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error.sync="error"
    error-text="加载失败，请点击重新加载"
  >
    <!-- 评论列表中，每项评论的组件 -->
    <!-- 子组件触发自定义事件 @reply-click ，并传参过来 comment 点击的当前评论项  -->
    <comment-item
      @reply-click="$emit('reply-click', $event)"
      v-for="item in list"
      :key="item.com_id"
      :comment="item"
    ></comment-item>
    <!-- <van-cell
      v-for="(item, index) in list"
      :key="index"
      :title="item.content"
    ></van-cell> -->
  </van-list>
</template>

<script>
// 引入 封装好的获取文章评论列表请求数据
import { getComments } from '@/api/comment'
// 引入封装好的 每项评论的组件
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  components: { CommentItem },
  props: {
    // 父组件传过来的  文章 id
    source: {
      type: [String, Number],
      required: true
    },
    list: {
      type: Array
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  data() {
    return {
      error: false,
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 初始值设置为空，默认从第一页开始加载
      limit: 10 // 每页数据10条
    }
  },

  methods: {
    // list 组件滚动条与底部距离小于 offset 时触发
    async onLoad() {
      try {
        // 封装好的获取文章评论列表请求数据  传值是个对象{4个参数如下}
        const res = await getComments({
          type: this.type, //  评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source, // 源id，文章id或评论id,【可能有大数字，所以执行一下toString 方法】
          offset: this.offset, // 评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        // 解构球球回来的数组，打散push进list数组
        this.list.push(...res.data.data.results)
        this.loading = false

        if (res.data.data.last_id === res.data.data.end_id) {
          this.finished = true
        } else {
          // this.offset = res.data.data.last_id
          this.offset = res.data.data.last_id
        }
      } catch (e) {
        // console.log(e)
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>
