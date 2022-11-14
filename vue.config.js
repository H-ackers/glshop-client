const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'./',
  transpileDependencies: true,
  lintOnSave: false,   //  关闭语法检查

  // 开启代理服务器
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',  //  代理目标服务器基础路径
        pathRewrite:{'^/api':''},
        ws: true,   //  用于支持websocket
        changeOrigin: true  //  用于控制请求头中的host值
      },
      // '/demo': {
      //   target: 'http://localhost:5001',
      //   pathRewrite:{'/demo':''},
      //   ws: true,   //  用于支持websocket
      //   changeOrigin: true  //  用于控制请求头中的host值
      // },
    }
  },
  
})
