import express from "express";

const app = express();

app.use("*", (req, res, next) => {

  // * 允许所有资源访问
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")  // '*' | Origin

  // 默认支持 GET、POST 其他不支持
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH')

  // 默认支持  Content-type: application/x-www-form-urlencoded | multipart/form-data | text/plain
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  next();
});

app.get("/info", (req, res) => {
  res.set('wangchi', 12345)
  res.setHeader('Access-Control-Expose-Headers', 'wangchi')
  res.json({
    code: 200,
    type: "get",
  });
});

app.get('/sse', (req, res) => {

  // SSE 单工通讯
  res.setHeader('Content-Type', 'text/event-stream')

  setInterval(() => {
    res.write('event:test\n')
    res.write('data:' + Date.now() + '\n\n')
  }, 1000)


})

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
