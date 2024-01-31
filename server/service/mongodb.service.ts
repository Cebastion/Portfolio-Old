import mongoose from 'mongoose'
import { IConfigService } from '../config/config.interface'

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

  GetWorks() {
    this.connect(this.DBWorks)
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

  AddWork() {
    this.connect(this.DBWorks)
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