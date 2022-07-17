<template>
  <div class="user-profile">
    <van-nav-bar title="个人信息">
      <template #left>
        <van-icon
          @click="$router.back()"
          name="arrow-left"
          color="white"
        ></van-icon>
      </template>
    </van-nav-bar>
    <!-- 修改头像input文件上传框 -->
    <input type="file" hidden ref="input" @change="fileChange" />
    <van-cell title="头像" is-link center @click="clickInput">
      <template #default>
        <van-image class="img" round :src="userInfo.photo"></van-image>
      </template>
    </van-cell>
    <van-cell
      @click="showPopup"
      :value="userInfo.name"
      title="昵称"
      is-link
    ></van-cell>
    <van-cell
      @click="genderShow = true"
      :value="userInfo.gender === 1 ? '男' : '女'"
      title="性别"
      is-link
    ></van-cell>
    <van-cell
      @click="birthdayShow = true"
      :value="userInfo.birthday"
      title="生日"
      is-link
    ></van-cell>

    <!-- 修改姓名弹出层 -->
    <van-popup position="bottom" v-model="show" :style="{ height: '100%' }">
      <van-nav-bar
        class="setName"
        title="设置昵称"
        left-text="取消"
        right-text="完成"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      ></van-nav-bar>
      <van-field
        v-model="message"
        rows="4"
        autosize
        type="textarea"
        maxlength="10"
        :placeholder="userInfo.name"
        show-word-limit
      />
    </van-popup>

    <!-- 修改性别弹出层 -->
    <van-popup
      position="bottom"
      v-model="genderShow"
      :style="{ height: '40%' }"
    >
      <update-gender
        v-model="userInfo.gender"
        @closeGender="genderShow = false"
      ></update-gender>
    </van-popup>

    <!-- 修改生日弹出层 -->
    <van-popup
      position="bottom"
      v-model="birthdayShow"
      :style="{ height: '40%' }"
    >
      <update-birthday
        v-model="userInfo.birthday"
        @closeBirthday="birthdayShow = false"
      ></update-birthday>
    </van-popup>

    <!-- 头像预览弹出层 -->
    <van-popup
      position="bottom"
      v-model="photoShow"
      :style="{ height: '100%' }"
    >
      <update-photo
        v-model="userInfo.photo"
        :img="img"
        @close="photoShow = false"
      ></update-photo>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile } from '@/api/user'
import updateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
  components: { updateGender, UpdateBirthday, UpdatePhoto },
  name: 'UserProfile',
  data() {
    return {
      userInfo: {},
      show: false,
      message: '',
      genderShow: false,
      birthdayShow: false,
      photoShow: false,
      img: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 点击头像单元格，触发隐藏的文件上传input框
    clickInput() {
      this.$refs.input.click()
    },
    // 给隐藏的文件上传input框，绑定change事件，文件内容发生改变时触发
    // 会接收一个事件对象e  e.target指向input的dom对象
    fileChange(e) {
      // console.log(e.target) // 拿到input的dom对象
      // console.log(this.$refs.input) // 拿到input的dom对象
      const file = e.target.files[0]
      console.log(file)
      // 拿到图片的预览地址
      const url = URL.createObjectURL(file)
      console.log(url)
      this.img = url
      // 用户选择了文件，change事件触发，显示弹层
      this.photoShow = true
    },
    // 点击昵称
    showPopup() {
      this.show = true
      this.message = this.userInfo.name
    },
    // 页面初始化 请求个人信息 用于渲染
    async getUserInfo() {
      const res = await getUserProfile()
      // console.log(res)
      this.userInfo = res.data.data
    },
    // 点击左边取消按钮
    onClickLeft() {
      this.show = false
    },
    // 点击右边确定按钮
    async onClickRight() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中'
      })
      try {
        const res = await updateUserProfile({
          name: this.message
        })
        console.log(res)
        this.userInfo.name = this.message
        this.show = false
        this.$toast('修改昵称成功')
      } catch (e) {
        console.log(e)
        this.$toast('修改昵称失败！')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.user-profile {
  .img {
    height: 80px;
  }
  .setName {
    /deep/.van-nav-bar__text {
      color: #fff;
    }
  }
}
</style>
