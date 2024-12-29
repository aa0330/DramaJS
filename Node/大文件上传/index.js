import express from 'express'
import multer from 'multer'
import cors from 'cors'
import fs, { appendFile, appendFileSync } from 'node:fs'
import path from 'node:path'

// 初始化multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/') //切片存储的目录
    },
    filename(req, file, cb) {
        console.log(111, req.body);
        cb(null, `${req.body.index}-${req.body.filename}`)
    },

})

const upload = multer({ storage })

const app = express()

app.use(cors())
app.use(express.json())

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('ok')
})

app.post('/merge', (req, res) => {

    const uploadDir = path.join(process.cwd(), 'upload')
    const dirs = fs.readdirSync(uploadDir)
    dirs.sort((a, b) => a.split('-')[0] - b.split('-')[0])
    const video = path.join(process.cwd(), 'video', `${req.body.fileName}.mp4`)
    dirs.forEach(item => {
        fs.appendFileSync(video, fs.readFileSync(path.join(uploadDir, item)))
        fs.unlinkSync(path.join(uploadDir, item))
    })

    res.send('ok')
})


app.listen(3000, () => {
    console.log('监听3000端口');

})

