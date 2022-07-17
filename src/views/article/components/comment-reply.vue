<template>
  <div class="comment-reply">
    <!-- 顶部nav-bar -->
    <van-nav-bar title="回复" @click-left="$emit('close')">
      <template #left>
        <van-icon color="white" name="cross" />
      </template>
    </van-nav-bar>
    <!-- 复用组件渲染评论项 -->
    <comment-item :comment="currentComment"></comment-item>
    <!-- 评论回复cell -->
    <van-cell title="评论回复"></van-cell>
    <!-- 回复评论的列表展示 -->
    <comment-list
      type="c"
      :list="list"
      :source="currentComment.com_id"
    ></comment-list>

    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post
        @postSuccess="postSuccess"
        type="c"
        :target="currentComment.com_id"
      ></comment-post>
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post.vue'
export default {
  name: 'CommentReply',
  components: { CommentItem, CommentList, CommentPost },
  props: {
    currentComment: {
      type: Object
    }
  },
  data() {
    return {
      list: [],
      isPostShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // post 输入框组件触发的自定义事件
    postSuccess(comment) {
      // 关闭输入弹层
      this.isPostShow = false
      // 往回复列表头部添加回复项
      this.list.unshift(comment)
      // 把 reply 传过去的currentComment.reply_count++
      this.currentComment.reply_count++
    }
  }
}
</script>
<style scoped lang="less">
.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
