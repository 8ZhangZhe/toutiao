<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
        maxlength="11"
        type="number"
      >
        <template #left-icon>
          <TouTiaoIcon icon="shouji" />
        </template>
      </van-field>
      <!-- type:指定输入框的类型 -->
      <!-- maxlength:指定输入的最大位数 -->
      <!-- required：是否显示必填的*符号 -->
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        required
        maxlength="6"
        type="number"
      >
        <template #left-icon>
          <TouTiaoIcon icon="yanzhengma" />
        </template>

        <template #button>
          <van-count-down
            v-if="isShowCountDown"
            :time="3000"
            format="ss 秒"
            @finish="isShowCountDown = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            native-type="button"
            size="mini"
            type="primary"
            @click="sendSmsCode"
            :loading="isDisabled"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'

import { Toast } from 'vant'

export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      // 定义变量，取值决定'倒计时组件'和'发送验证码组件'的互斥显示
      isShowCountDown: false,
      isDisabled: false,
      user: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          {
            // 校验如果未填写，提示消息
            required: true,
            message: '手机号不能为空'
          },
          {
            // 校验填写内容如果不满足正则，提示消息
            pattern: /1[3456789]\d{9}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式不正确'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      // value自动从表单里面获取的值
      // 获取到的值是对象： key >> 表单的name值  value >> 用户输入的值
      // await 后面写的是 promise
      // 只有promise成功了的情况下待会继续执行后面的代码

      // 如果要捕获await的错误  用try  catch
      try {
        const res = await login(this.user)
        console.log(res)
        // 登陆成功 提示用户
        // Toast === this.$toast
        Toast.success('登陆成功')
      } catch (e) {
        // e >> 错误对象信息
        //
        Toast.fail(e.response.data.message || '服务器端错误')
      }
    },
    // 点击验证码时，单独校验手机号格式是否正确
    async sendSmsCode () {
      // 根据文档：通过 ref 可以获取到 Form 实例并调用实例方法
      // validate：验证表单，支持传入 name 来验证单个或部分表单项

      // 不同的try处理不同的错误
      try {
        await this.$refs.form.validate('mobile')
      } catch (e) {
        console.log(e)
        return
      }
      try {
        // 接口获取到结果之前，我的按钮一直可以重复点击，重复发送请求
        // 预期：接口拿到结果之前可以置灰按钮 disable

        // button 合适的实际添加disable
        this.isDisabled = true
        // 调用获取验证码接口
        await getSmsCode(this.user.mobile)
        // 校验通过后，显示'发送验证码按钮'
        this.isShowCountDown = true
        // 获取成功以后进行提示
        this.$toast.success('发送验证码成功')
      } catch (e) {
        // 如果获取失败的，进行错误的提示
        Toast.fail(e.response.data.message || '出错了')
      } finally {
        // 不管成功或失败，请求结束都会执行的逻辑 finally
        this.isDisabled = false
      }
    }
  }
}
</script>
<style scoped lang="less">
/deep/.toutiao {
  font-size: 37px;
}
.send-sms-btn {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
</style>
