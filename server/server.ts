require('dotenv').config()
import cors from 'cors'
import express, { json, Request, Response } from 'express'
import path from 'path'
import { ConfigService } from './config/config.service'
import { MailerService } from './service/mailer.service'

const app = express()
app.use(json())
app.use(cors())

app.use('/admin/', express.static(path.join(__dirname, 'admin')))

app.get('/admin/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'admin', 'admin.html'))
})

app.use('/', express.static(path.resolve(__dirname, 'public')))

app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.get('/works', (req: Request, res: Response) => {
  res.send("Server is running")
})

app.get('/offers', (req: Request, res: Response) => {
  res.send("Server is running")
})

app.post('/add_work', (req: Request, res: Response) => {
  res.send("Server is running")
})

app.post('/add_offer', (req: Request, res: Response) => {
  res.send("Server is running")
})

app.post('/sendEmail', (req: Request, res: Response) => {
  const { nameproject, email, offer } = req.body
  const mailerService = new MailerService(nameproject, email, offer, new ConfigService())
  const result = mailerService.sendEmail()
  res.send(result)
})

app.listen(5500, () => {
  console.log("Active")
})