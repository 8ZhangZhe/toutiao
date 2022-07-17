<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="img" />

    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
// 导入使用，初始化裁剪组件
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdatePhoto',
  components: {},
  props: {
    // 预览图片地址信息
    img: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const image = this.$refs.img
    // 裁剪器对象
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
    // 不能在这里调用 this.cropper.getCroppedCanvas() 方法！因为裁剪器还没初始化好
  },
  methods: {
    // 确定事件
    onConfirm() {
      // 基于服务端的裁切使用 getData 方法获取裁切参数
      // console.log(this.cropper.getData())

      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        console.log(blob) // 裁剪后的结果信息
        this.updateUserPhoto(blob)
      })
    },
    // 上传更新头像方法
    async updateUserPhoto(blob) {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中'
      })
      const fb = new FormData()
      fb.append('photo', blob)
      try {
        const res = await updateUserPhoto(fb)
        console.log(res.data.data.photo)
        this.$emit('input', res.data.data.photo)
        this.$emit('close')
        this.$toast('更新头像成功')
      } catch (e) {
        this.$toast('加载失败！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.update-photo {
  background-color: #000;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>
