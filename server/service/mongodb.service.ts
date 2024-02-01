import mongoose from 'mongoose'
import { IConfigService } from '../config/config.interface'
import { IWork } from '../interface/works.interface'
import { WorkModule } from '../module/work.module'

export class MongoDb {
  private DBOffers: string
  private DBWorks: string
  constructor(private readonly configService: IConfigService) {
    this.DBOffers = this.configService.get('URL_MONGO_OFFERS')
    this.DBWorks = this.configService.get('URL_MONGO_WORKS')
  }

  private async connect(db: string) {
    await  mongoose.connect(db)
  }

  private async disconnect() {
    await mongoose.disconnect()
  }

  async GetWorks() {
    try {
      await this.connect(this.DBWorks)
      const works = await WorkModule.find()
      return works
    } catch (error) {
      console.log(error)
    } finally {
      await this.disconnect()
    }
  }

  GetOffers() {
    this.connect(this.DBOffers)
  }

  GetOffer() {
    this.connect(this.DBOffers)
  }

  AddOffer() {
    this.connect(this.DBOffers)
  }

  async AddWork(work: IWork) {
    try {
      await this.connect(this.DBWorks)
      await WorkModule.create({_id: new mongoose.Types.ObjectId(), title: work.title, description: work.description, url: work.url})
    } catch (error) {
      console.log(error)
      return error
    } finally {
      await this.disconnect()
    }
  }

  DeleteOffer() {
    this.connect(this.DBOffers)
  }

  DeleteWork() {
    this.connect(this.DBWorks)  
  }

  UpdateOffer() {
    this.connect(this.DBOffers)
  }

  UpdateWork() {  
    this.connect(this.DBWorks)
  }
}