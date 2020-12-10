const Koa = require('koa');
const json = require('koa-json');

const path = require('path');
const serve = require('koa-static');
const historyApiFallback = require('koa2-history-api-fallback');

const koaBodyparser = require('koa-bodyparser');

const routerResponse =  require('./server/middlewares/routerResponse');
const app = new Koa();

app.use(koaBodyparser());
app.use(json());
app.use(routerResponse());

const fs = require('fs');
const readDir = fs.readdirSync('./server/routers/');

const writeLog = data=>{
  fs.appendFile('./log.txt',data,'utf8',e=>{});
}

app.on('error',(err,ctx)=>{
  writeLog('server error' + err + '\n' + JSON.stringify(ctx) + '\r\n')
  ctx.body = {
    success:false,
    data:ctx,
    message:err
  }
})

readDir.forEach(item=>{
  app.use(require(`./server/routers/${item}`).routes());
})

app.use(historyApiFallback());
app.use(serve(path.resolve('dist')));

app.listen(3000,()=>{
  console.log('Koa is listening in 3000')
})