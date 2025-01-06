import express from "express";
import cors from "cors";
import fs from "node:fs";
import crypto from "node:crypto";

const app = new express();

app.use(express.json());
app.use(cors());

// 静态资源缓存 css js png html
// app.use(express.static("./static", {
//     maxAge: 1000*60*5,
//     lastModified:true
// }));

// 动态资源缓存 -> 接口
app.get("/cache1", (req, res) => {
  res.setHeader("Expires", new Date("2025-1-6 19:14:00").toUTCString());
  res.send("hello");
});

// Cache-Control
app.get("/cache2", (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=10");
  res.send("Cache-Control");
});

const getFileModifyTime = () => fs.statSync("./index.js").mtime.toISOString();

// Last-Modified
app.get("/cache3", (req, res) => {
  const ifModifiedSince = req.headers["if-modified-since"];
  const modifyTime = getFileModifyTime();

  if (ifModifiedSince === modifyTime) {
    console.log("缓存了");
    res.statusCode = 304;
    res.end();
    return;
  }

  console.log("没缓存");

  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Last-Modified", modifyTime);
  res.send("Last-Modified");
});

// 根据文件内容生成hash值
const getFileHash = () => {
  return crypto
    .createHash("sha256")
    .update(fs.readFileSync("index.js"))
    .digest("hex");
};
// ETage
app.get("/cache4", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, max-age=2592000");
  const ifNoneMatch = req.headers["if-none-match"];
  const etag = getFileHash();

  if (ifNoneMatch === etag) {
    console.log("缓存了");
    res.statusCode = 304;
    res.end();
    return;
  }

  console.log("没缓存");

  res.setHeader("ETag", etag);
  res.send("ETag");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
