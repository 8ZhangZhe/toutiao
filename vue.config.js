const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置webpack
  configureWebpack: {
    // 开发服务器
    devServer: {
      // 自动打开网页
      open: true,
      // 端口号
      port: 30000,
      // 协议
      host: '127.0.0.1'
    },
    resolve: {
      alias: {
        '#': path.join(__dirname, 'src/components')
      }
    }
  }
})
