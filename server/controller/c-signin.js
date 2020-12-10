const userModel = require('../lib/mysql');
const config = require('../config');
const jwt = require('jsonwebtoken')

exports.postSignin = async ctx=>{
  let {user_name,user_pass} = ctx.request.body;
  await userModel.findUserData(user_name).then(res=>{
    let userInfo = res[0];
    let ip = config.getClientIP(ctx);
    ctx.success({
      userInfo,
      token: jwt.sign(Object.assign({ ip }, userInfo),
        config.JWTs.secret, { expiresIn: config.JWTs.expiresIn })
    })
  })
}