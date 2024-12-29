import fs from 'node:fs'
import jsyaml from 'js-yaml'
import express from 'express'
import knex from 'knex'

const yaml = fs.readFileSync('./db.config.yaml', 'utf8')
const config = jsyaml.load(yaml)

const db = knex({
    client: 'mysql2',
    connection: config.db
})

// knex所有代码直接编写没有效果 
db.schema.createTableIfNotExists('sites_user', table => {
    table.increments('id'),
        table.integer('age'),
        table.string('name'),
        table.string('hobby'),
        table.timestamps(true, true) // 创建时间
}).then(() => {
    console.log('创建成功');
})

const app = express()

// express 不支持POST 
app.use(express.json())

//查询接口 全部
app.get('/', async (req, res) => {
    const data = await db('sys_user').select()
    const count = await db('sys_user').count("* as total")  // [{total:1}]
    res.json({
        data,
        total: count[0].total
    })
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
    await db('list').insert({ age, name, hobby })
    res.send({ code: 200, message: '插入成功' })
})

// 编辑
app.post('/update', async (req, res) => {
    const { id, name, age, hobby } = req.body
    await db('list').update({ age, name, hobby }).where({ id })
    res.send({ code: 200, ok: 1 })
})

// 删除
app.post('/delete', async (req, res) => {

    await db("sys_user").delete().where({ id: req.body.id })
    res.send({ code: 200 })
})


const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
