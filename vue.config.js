const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/smp-app'
})

// module.exports = {
//   devServer: {
//     //host: 'localhost',
//     port: 8005, // 端口
//   }
// }
