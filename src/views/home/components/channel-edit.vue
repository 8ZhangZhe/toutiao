<template>
  <div class="channel-edit">
    <!-- 频道编辑标题 -->
    <van-cell style="text-align: center" title="频道编辑" />
    <!-- 我的频道标题 -->
    <van-cell title="我的频道">
      <template #default>
        <van-button
          plain
          type="danger"
          round
          size="mini"
          @click="isEdit = !isEdit"
        >
          <!-- 编辑 -->
          {{ isEdit ? "完成" : "编辑" }}
        </van-button>
      </template>
    </van-cell>
    <!-- 我的频道格子 -->
    <van-grid :gutter="10" class="my-channel">
      <van-grid-item
        class="channel-item"
        v-for="(value, index) in userChannels"
        :key="value.id"
        @click="onMyChannelClick(value, index)"
      >
        <!-- icon 插槽 -->
        <template #icon v-if="isEdit && index !== 0">
          <van-icon name="clear"></van-icon>
        </template>
        <!-- 文字插槽 -->
        <template #text>
          <span class="text" :class="{ active: active === index }">{{
            value.name
          }}</span>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐标题 -->
    <van-cell title="频道推荐"></van-cell>
    <!-- 频道推荐格子 -->
    <van-grid class="recommend-channel" :gutter="10" direction="horizontal">
      <van-grid-item
        class="channel-item"
        icon="plus"
        v-for="recommendItem in recommendChannles"
        :key="recommendItem.id"
        @click="addchannel(recommendItem)"
      >
        <template #text>
          <span class="text">{{ recommendItem.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { USERCHANNELKEY } from '@/USERCHANNELKEY.js'
import { differenceBy } from '@/utils/lodash'
import { getAllChannels, getAddChannels, deleteUserChannel } from '@/api/channel'
import { setStorage } from '@/utils/storage'
import { mapState } from 'vuex'
// import lodash from 'lodash'  // 引入所有lodash的方法，体积大
// import differenceBy from 'lodash/differenceBy' // 引入lodash的引入所有lodash的方法方法,体积小，推荐
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      default: () => []
    },
    active: {
      type: Number
    }
  },
  data () {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  computed: {
    // 拓展：使用lodash计算推荐频道数据
    recommendChannles () {
      return differenceBy(this.allChannels, this.userChannels, 'id')
    },
    // 用计算属性把vuex里面的 user 里面的 token 封装起来，方便随时根据依赖性变化更新
    ...mapState(['user']) // this.$store.state.user

  // ...mapState(["user"])   原生的解构等效于  下面  定义user计算属性函数
  // user () {
  //   return this.$store.state.user
  // },
  },
  /*     computed: {
    // 计算属性，存放：所有频道 - 我的频道 = 推荐频道
    recommendChannels () {
      // 所有频道 filter 过滤： 返回true >> 留下
      return this.allChannels.filter((item) => {
        // 我的频道 some 筛选: 条件成立 >> 返回 true，取反
        return !this.userChannels.some((userItem) => {
          // 判断：我的频道每项usertItem.id  ===  所有频道每项item.id
          // 找到了就返回true
          return userItem.id === item.id
        })
      })
    }
  }, */
  watch: {},
  created () {
    this.fetchAllChannels()
  },
  mounted () {},
  methods: {
    async fetchAllChannels () {
      const res = await getAllChannels()
      // console.log(res)
      this.allChannels = res.data.data.channels
    },
    async addchannel (channel) {
      // 子组件不允许修改父组件的数据
      this.userChannels.push(channel)
      // 持久化
      // 本地存储  >> 未登录
      // 线上服务器 >> 已登录
      // 判断是否登录  >> token  >>  vuex里面取值
      // console.log(this.user)
      if (this.user) {
        // 已登录 >> 请求接口添加频道
        console.log('已登录')
        try {
          await getAddChannels({
            id: channel.id,
            seq: this.userChannels.length
          })
          this.$toast('添加频道成功')
        } catch (e) {
          console.log(111)
          this.$toast('添加频道失败')
        }
      } else {
        // 未登录
        // 修改之后的个人频道数据存储到本地存储
        setStorage(USERCHANNELKEY, this.userChannels)
      }
    },
    // 定义删除某一项持久化函数
    async deleteChannel (channel) {
      // 想要删除的频道
      try {
        if (this.user) {
          await deleteUserChannel(channel.id)
        } else {
          // 修改之后的数据存储到本地存储
          setStorage(USERCHANNELKEY, this.userChannels)
        }
        this.$toast('删除成功')
      } catch (e) {
        this.$toast('删除失败')
      }
    },
    onMyChannelClick (channel, index) {
      // 判断 isEdit 看是否处于编辑状态
      if (this.isEdit) {
        // 编辑状态 >> 点击频道 >> 删除频道
        // 点击索引 大于 选中索引(active) --> 直接删除
        // 点击索引小于等于 >> 选中索引(active) >> 先删除/选中状态-1(同时当前频道弹层不能关闭)
        if (index === 0) return // Notify({ type: 'danger', message: '删除此频道需开通VIP！点击跳转至开通页面~' })
        if (index <= this.active) {
          this.$emit('changeActive', this.active - 1, true)
        }
        // 从数组里面删除某一项
        this.userChannels.splice(index, 1)
        // 持久化
        this.deleteChannel(channel)

        // Notify({ type: 'success', message: '成功删除一个频道！' })
      } else {
        // 非编辑状态 >> 1.切换 >> 2.关弹层  （通知父组件）
        this.$emit('changeActive', index, false)
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-button {
  width: 100px;
}
/deep/.channel-item {
  .van-grid-item__content {
    white-space: nowrap;
    background-color: #f4f5f6;
  }
  .van-grid-item__icon-wrapper {
    position: unset;
  }
}
.text {
  font-size: 0.37333rem;
  color: #222;
  margin-top: 0;
  font-size: 24px;
  &.active {
    color: red;
  }
}
/deep/.recommend-channel {
  .van-icon-plus {
    font-size: 24px;
    margin-right: 4px;
  }
}

/deep/.my-channel {
  .van-icon-clear {
    font-size: 26px;
    position: absolute;
    right: -13px;
    top: -13px;
    color: #cacaca;
  }
}
</style>
