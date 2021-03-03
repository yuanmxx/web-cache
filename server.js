const Koa = require('koa');
const path = require('path');
const statics = require('koa-static');
//静态资源中间件
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const app = new Koa();
const port = 8888;

app.use(conditional());
app.use(etag());
app.use(async (ctx, next) => {
 // 设置响应头Cache-Control 设置资源有效期为100秒
  ctx.set({
    'Cache-Control': 'no-cache'  
  });
  await next();
});
app.use(statics(path.resolve(__dirname, './static')));

app.listen(port, () => {
  console.log(`服务器启动在${port}端口`);
});