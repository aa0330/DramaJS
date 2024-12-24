import express from "express";

const app = express();

app.use("*", (req, res, next) => {
  // * 允许所有资源访问
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://127.0.0.1:3000/Node/express_dev/index.html"
  ); // '*' | Origin
  next();
});

app.get("/info", (req, res) => {
  res.json({
    code: 200,
    type: "get",
  });
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
