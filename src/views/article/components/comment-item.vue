<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        @click="onCommentLike"
        class="like-btn"
        :class="{ active: comment.is_liking }"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        :loading="loading"
      >
        {{ comment.like_count || '赞' }}
      </van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">
          {{ comment.pubdata | relativeTime }}
        </span>
        <!-- 点击回复按钮 -> 触发自定义事件，向上传两级 >> list >> index  同时传参 comment 点击的当前评论项-->
        <van-button class="reply-btn" round @click="$emit('reply-click', comment)"
          >回复 {{ comment.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
// 引入封装好的，点赞评论和取消点赞评论的请求数据接口
import { deleteCommentLike, addCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  props: {
    // 每行的评论信息，父组遍历同时件传值过来
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    // 点击 评论点赞按钮触发事件
    async onCommentLike() {
      this.loading = true
      // 判断服务器返回的comment.is_liking是否为已点赞状态
      try {
        if (this.comment.is_liking) {
          // 为true >> 取消对评论的点赞 >> 调用封装的取消点赞接口数据，传参评论id
          await deleteCommentLike(this.comment.com_id)
          this.comment.like_count--
          this.$toast('取消点赞成功！')
        } else {
          // 为false >> 对评论点赞 >> 调用封装的评论点赞接口数据，传参评论id
          await addCommentLike(this.comment.com_id)
          this.comment.like_count++
          this.$toast('点赞成功！')
        }
        this.loading = false
        // 修改父组件传来的comment对象中，属性is_liking的值，取反
        this.comment.is_liking = !this.comment.is_liking
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .like-btn {
    &.active {
      color: red;
    }
  }
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    // width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
  .liked {
    background-color: orange;
  }
}
</style>
