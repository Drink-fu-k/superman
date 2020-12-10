const userModel = require('../lib/mysql');
const bcrypt = require('bcryptjs'); // 引入Bcrypt 密码加密
const config = require('../config');

exports.postRegister = async ctx=>{
  let {user_name,user_pass,user_email} = ctx.request.body;
  let res_ = await userModel.findUserData(user_name)
  let _res = await userModel.findEmailData(user_email)
  if(res_.length>0 || _res.length >0){
    ctx.fail('用户名或邮箱已存在',-1)
  }else{
    user_pass = bcrypt.hashSync(user_pass,bcrypt.genSaltSync(10));
    let res = await userModel.insertData([user_name,user_pass,new Date().toLocaleString(),config.getClientIP(ctx),user_email]);
    if(res.affectedRows == 1){
      ctx.success()
    }
  }
}