<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onPost"
      :disabled="!message.trim().length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  // 父组件传过来文章id
  props: {
    target: {
      type: [String, Number],
      required: true
    },
    type: {
      type: [String, Number],
      default: 'a'
    }
  },
  data() {
    return {
      // 收集的输入框内容
      message: ''
    }
  },
  inject: ['articleId'], // 注入：文章的id
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 点击发布按钮触发事件
    async onPost() {
      // 添加中间弹窗loading效果
      this.$toast.loading({
        duration: 0, // 表示toast不会消失,需要下个$toast提示弹窗出来把他顶掉
        forbidClick: true // 禁用背景点击，发布过程中不能操作背景
      })
      try {
        // 调用封装好的发表评论请求数据接口
        const res = await addComment({
          target: this.target, // 评论目标id（评论文章即文章id，对评论进行回复则为评论id） 防止有大数字最好也执行一下toString方法！
          content: this.message, // 评论内容
          art_id: this.type === 'c' ? this.articleId : null // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        this.$toast.success('评论成功！')
        // 清空输入框的文字
        this.message = ''
        // 调用父组件的自定义事件，把当前评论项内容传过去，由父组件渲染
        this.$emit('postSuccess', res.data.data.new_obj)
      } catch (e) {
        this.$toast.fail('评论失败！')
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
