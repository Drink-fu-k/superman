const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool({
  host:config.mysqlDB.host,
  user:config.mysqlDB.user,
  password:config.mysqlDB.password,
  database:config.mysqlDB.database
})

let query = (sql,values)=>{
  return new Promise((resolve,reject)=>{
    pool.getConnection((err,connection)=>{
      if(err){
        reject(err)
      }else{
        connection.query(sql,values,(err,rows)=>{
          if(err){
            reject(err)
          }else{
            resolve(rows)
          }
          connection.release();
        })
      }
    })
  })
}

exports.insertData = value=>{
  let _sql = `insert into user set user_name=?,pass_word=?,create_time=?,login_ip=?,user_email=?;`
  return query(_sql,value);
}

exports.findUserData = name =>{
  let _sql = `select * from user where user_name="${name}";`
  return query(_sql);
}

exports.findEmailData = email => {
  let _sql = `select id from user where user_email="${email}";`
  return query(_sql)
}

exports.findPostsData = title => {
  let _sql = `select * from posts`
  return query(_sql)
}

exports.updateLoginInfo = value =>{
  let _sql = `UPDATE user SET login_ip=? where id=?`
  return query(_sql,value)
}

exports.insertPosts = value=>{
  let _sql = `insert into posts set name=?,title=?,content=?,md=?,uid=?,moment=?,avator=?`
  return query(_sql,value);
}