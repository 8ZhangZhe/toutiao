<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="acticleList.art_id">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ acticleList.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="acticleList.aut_photo"
          />
          <div slot="title" class="user-name">{{ acticleList.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ acticleList.pubdate | relativeTime }}
          </div>
          <!-- 关注作者按钮 -->
          <FollowUser
            :userId="acticleList.aut_id"
            v-model="acticleList.is_followed"
          ></FollowUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          ref="content"
          class="article-content markdown-body"
          v-html="acticleList.content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论 -->
        <comment-list></comment-list>
        <!-- /评论 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="isNotFound">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArtcileInfo"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="acticleList.comm_count" color="#777" />
      <!-- 收藏按钮 -->
      <CollectArticle
        v-model="acticleList.is_collected"
        :artId="acticleList.art_id"
      />
      <!-- 点赞按钮 -->
      <likeArticle
        v-model="acticleList.attitude"
        :artId="acticleList.art_id"
      ></likeArticle>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import FollowUser from './components/follow-user/index.vue'
import CollectArticle from './components/collect-article/index.vue'
import likeArticle from './components/like-article/index.vue'
// 引入github-markdown.css全局样式
import 'github-markdown-css'
import { getArticleById } from '@/api/article.js'
import { ImagePreview } from 'vant'
import CommentList from './components/comment-list.vue'
export default {
  name: 'ArticleIndex',
  components: { FollowUser, CollectArticle, likeArticle, CommentList },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      isNotFound: false,
      acticleList: {},
      loading: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArtcileInfo()
  },
  mounted() {},
  methods: {
    previewIng() {
      // 获取所有的img图片
      // src属性
      // push到一个新数组里面
      // 获取到界面所有的dom结构
      // console.log(this.$refs.content)
      const imgs = this.$refs.content.querySelectorAll('img')
      // console.log(imgs)
      // 获取图片链接列表  存储所有图片的路径数组
      const images = []
      // 遍历dom结构获取图片链接，存入数组
      imgs.forEach((item, index) => {
        images.push(item.src)
        item.addEventListener('click', function () {
          // 利用vant组件-图片预览组件，实现预览功能
          ImagePreview({
            images: images,
            startPosition: index // 设置起始索引号
          })
        })
      })

      // console.log(images)
    },
    async loadArtcileInfo() {
      try {
        this.loading = true
        const res = await getArticleById(this.articleId)
        console.log(res)
        this.acticleList = res.data.data
        this.loading = false
        this.$nextTick(() => {
          this.previewIng()
        })
      } catch (e) {
        console.log(e)
        this.isNotFound = e?.response?.status === 404
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
// .van-icon-arrow-left {
//   color: #fff !important;
// }
</style>
