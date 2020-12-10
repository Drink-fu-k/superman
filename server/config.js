// 后台配置文件
module.exports = {
  // 数据库配置
  mysqlDB: {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'db_carlos'
  },
  // token 配置
  JWTs: {
    secret: 'carlos', // 指定密钥
    expiresIn: '2h' // 超时设置 m分钟 h小时 d天数
  },
  // 公用：获取客户端IP
  getClientIP: function (ctx) {
    let req = ctx.request
    let ip = ctx.ip ||
      req.headers['x-forwarded-for'] ||
      req.ip ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress || ''
    let arr = ip.match(/(\d{1,3}\.){3}\d{1,3}/)
    return arr ? arr[0] : ''
  },
  // 验证权限函数
  verify: (ctx) => {
    return new Promise((resolve, reject) => {
      if (ctx.url.substring(0, 5) !== '/api/') {
        resolve({})// 非后端接口请求
      }
      let arr = /\/api\/([a-zA-Z]+)/.exec(ctx.url)
      let key = arr ? arr[1] : ''
      let obj = urls[key]
      if (!urls.hasOwnProperty(key)) {
        resolve('非法请求链接：' + ctx.url)
      } else if (ctx.method !== (obj.method ? obj.method : 'post').toUpperCase()) {
        resolve('非法请求方式：' + ctx.method)
      }
      // 异步验证token
      const userType = obj.userType
      if (userType === 0) {
        resolve({}) // 不需要验证token
      }
      jwt.verify(ctx.request.header.authorization, config.JWTs.secret, (err, decoded) => {
        if (err) {
          resolve('token验证错误！')
        } else {
          if (config.getClientIP(ctx) !== decoded.ip || !Number.isInteger(decoded.id)) {
            resolve('token无效！')
          } else if (decoded.user_type > userType) {
            resolve('对不起您无权操作！')
          }
        }
        resolve(decoded)// 把用户信息带上
      })
    })
  }
}
