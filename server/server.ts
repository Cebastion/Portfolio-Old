require('dotenv').config()
import cors from 'cors'
import express, { json, Request, Response } from 'express'
import { ConfigService } from './config/config.service'
import { MailerService } from './service/mailer.service'
import { MongoDb } from './service/mongodb.service'
import { IWork } from './interface/works.interface'

const db = new MongoDb(new ConfigService())
const app = express()
app.use(json())
app.use(cors())

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

app.post('/add_work', async (req: Request, res: Response) => {
  const data: IWork = req.body
  await db.AddWork(data)
})

app.post('/add_offer', (req: Request, res: Response) => {
  res.send("Server is running")
})

app.post('/edit_work', (req: Request, res: Response) => {
  res.send("Server is running")
})

app.post('/edit_offer', (req: Request, res: Response) => {
  res.send("Server is running")
})

app.post('/delete_work', (req: Request, res: Response) => {
  res.send("Server is running")
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

app.listen(5500, () => {
  console.log("Active")
})