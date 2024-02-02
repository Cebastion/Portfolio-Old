require('dotenv').config()
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import express, { json, Request, Response } from 'express'
import { ConfigService } from './config/config.service'
import { MailerService } from './service/mailer.service'
import { MongoDb } from './service/mongodb.service'
import { IWork } from './interface/works.interface'
import bodyParser from 'body-parser'

const db = new MongoDb(new ConfigService())
const app = express()
app.use(json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join('images')
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const _id = req.query._id
    if(_id) {
      const ext = path.extname(file.originalname)

    const filename = `${_id}${ext}`
    cb(null, filename)
    }
  },
})

const upload = multer({ storage: storage })

app.get('/works', async (req: Request, res: Response) => {
  const works = await db.GetWorks()
  res.json(works)
})

app.get('/offer', (req: Request, res: Response) => {
  res.send("Server is running")
})

app.get('/offers', (req: Request, res: Response) => {
  res.send("Server is running")
})

app.post('/add_work', upload.single('img'), async (req: Request, res: Response) => {
  const data: IWork = req.body
  await db.AddWork(data)
})

app.post('/add_offer', (req: Request, res: Response) => {
  res.send("Server is running")
})

app.post('/edit_work', upload.single('img'), (req: Request, res: Response) => {
  const data = req.body
  db.UpdateWork(data)
})

app.post('/edit_offer', (req: Request, res: Response) => {
  res.send("Server is running")
})

app.post('/delete_work', async (req: Request, res: Response) => {
  const _id = req.body
  await db.DeleteWork(_id)
})

app.post('/delete_offer', (req: Request, res: Response) => {
  res.send("Server is running")
})

app.post('/sendEmail', (req: Request, res: Response) => {
  const { nameproject, email, offer } = req.body
  const mailerService = new MailerService(nameproject, email, offer, new ConfigService())
  const result = mailerService.sendEmail()
  res.send(result)
})

app.get('/image/:_id', (req: Request, res: Response) => {
  const _id = req.params._id
  const supportedFormats = ['webp', 'png', 'jpg']
  const dir = path.join('images')
  const files = fs.readdirSync(dir)
  const file = files.find(name => {
    for (const format of supportedFormats) {
      if (name.endsWith(`.${format}`) && name.split(`.${format}`)[0] === _id) {
        return true
      }
    }
    return false
  })
  if (!!file) {
    res.sendFile(file)
  } else {
    res.send({ error: '404' })
  }
})

app.listen(5500, () => {
  console.log("Active")
})