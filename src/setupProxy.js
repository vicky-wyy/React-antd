const proxy = require('http-proxy-middleware')

module.exports = function(app){
  app.use(
    proxy.createProxyMiddleware('/api1',{
      target:'http://tl.cooacloud.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/api1':''
      }
    })
  )
}