const userModel = require('../lib/mysql');

exports.getPosts = async ctx=>{
  await userModel.findPostsData().then(res=>{
    ctx.success(res);
  }).catch(err=>{
    ctx.fail('err',-1);
  })
}

exports.postContent = async ctx =>{
  let {content} = ctx.request.body;
  await userModel.insertPosts(['zhangsan','title',content,'md',2,new Date().toLocaleTimeString(),'sdafasdf']).then(res=>{
    if(res.affectedRows == 1){
      ctx.success();
    }else{
      ctx.fail();
    }
  }).catch(err=>{
    ctx.fail('发表失败',-1)
  })
}