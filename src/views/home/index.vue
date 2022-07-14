<template>
  <div class="home-container">
    <!-- 搜索栏 -->
    <van-nav-bar fixed>
      <template #title>
        <van-button
          icon="search"
          size="small"
          round
          block
          class="button-btn"
          type="info"
          to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="item in userChannels" :key="item.id" :title="item.name">
        <!-- 封装的文章列表组件 articleList -->
        <articleList :channel="item"></articleList>
      </van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn" @click="show = true">
          <!-- 封装的icon图标组件，汉堡更多图标 -->
          <TouTiaoIcon icon="gengduo"></TouTiaoIcon>
        </div>
      </template>
    </van-tabs>

    <!-- 频道编辑弹层 -->
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '90%' }"
    >
    <!-- 封装的编辑频道组件 -->
    <channel-edit
    :userChannels="userChannels"
    :active="active"
    @changeActive="changeActive"
    >
    </channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getStorage } from '@/utils/storage'
import articleList from './components/article-list.vue'
import { USERCHANNELKEY } from '@/USERCHANNELKEY'
// 引入获取频道数据
import { getUserChannels } from '@/api/channel'
import ChannelEdit from './components/channel-edit.vue'
export default {
  name: 'HomePage',
  components: { articleList, ChannelEdit },
  props: {},
  data () {
    return {
      show: false,
      active: 0,
      // 定义数据接收频道列表
      userChannels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    // 调用封装获取频道数据的方法
    this.loadChannels()
  },
  mounted () {},
  methods: {
    // 封装获取频道数据的方法
    async loadChannels () {
      // const res = await getUserChannels()
      // console.log('home/index里面的--获取取频道数据如下')
      // console.log(res)
      // this.userChannels = res.data.data.channels
      try {
        // 获取用户token
        const UserToken = this.$store.state.user?.token
        // 获取本地储存用户频道
        let channel = getStorage(USERCHANNELKEY)
        if (UserToken || !channel) {
          const res = await getUserChannels()
          console.log(res)
          channel = res.data.data.channels
        }
        this.userChannels = channel
      } catch (e) {

      }
    },
    // 自定义事件，子组件 频道编辑 触发
    changeActive (index, isClose) {
      // 修改 active 当前选中高亮的频道
      this.active = index
      // 关闭弹层
      this.show = isClose
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  // 搜索栏样式
  /deep/.van-nav-bar__title {
    width: 70%;
    max-width: unset;
    .button-btn {
      background-color: #5babfb;
      border: none;
      .van-icon-search {
        color: #fff;
        margin-top: 4px;
      }
    }
  }

  // 频道列表样式
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }

    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }
  }

  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }

  // 右侧汉堡更多按钮样式
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
  }
}
</style>
