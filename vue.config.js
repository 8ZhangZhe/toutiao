const { defineConfig } = require('@vue/cli-service')
const path = require('path') // 引入payh绝对路径
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
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '黑马头条'
      return args
    })
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${path.join(__dirname, 'src/styles/theme.less')}";`
          }
        }
      }
    }
  }
})
