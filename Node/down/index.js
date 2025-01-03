import express from 'express'
import cors from 'cors'
import path from 'node:path'
import fs from 'node:fs'

const app = new express();

app.use(cors())
app.use(express.json())

app.post('/download', (req, res) => {
    const fileName = req.body.fileName;
    const filePath = path.join(process.cwd(), 'static', fileName)
    const content = fs.readFileSync(filePath)
    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader('Content-Disposition', 'attachment;filname=' + fileName)
    res.send(content)
})


app.listen(3000, () => {
    console.log('3000端口服务已经启动！');
})