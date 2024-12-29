import mysql2 from 'mysql2/promise'
import fs from 'node:fs'
import jsyaml from 'js-yaml'
import express from 'express'

const yaml = fs.readFileSync('./db.config.yaml', 'utf8')
const config = jsyaml.load(yaml)

const sql = await mysql2.createConnection({
  ...config.db
})
const app = express()

// express 不支持 
app.use(express.json())

//查询接口 全部
app.get('/', async (req, res) => {
  const [data] = await sql.query('select * from sys_user')
  res.send(data)
})

// 查询单个  params 
app.get('/user/:id', async (req, res) => {
  const [data] = await sql.query(`select * from user_sys where id = ${req.params.id}`)
  // const [data] = await sql.query(`select * from user_sys where id = ?` [req.params.id])
  res.send(data)
})

// 新增接口
app.post('/create', async (req, res) => {
  const { name, age, hobby } = req.body;
  await sql.query('insert into sys_user(name,age,hobby) values(?,?,?)', [name, age, hobby])
  res.send({ code: 200, message: '插入成功' })
})

// 编辑
app.post('/update', async (req, res) => {
  const { id, userName, age } = req.body
  await sql.query('update  sys_user set user_name = ? ,age = ?  where id = ?', [userName, age, id]);
  res.send({ code: 200, ok: 1 })
})

// 删除
app.post('/delete', async (req, res) => {
  await sql.query(`delete from sys_user where id = ${req.body.id}`);
  res.send({ code: 200 })
})


const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
