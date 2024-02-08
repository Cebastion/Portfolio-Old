import mongoose from 'mongoose'
import { IConfigService } from '../config/config.interface'
import { IWork, IWorks } from '../interface/works.interface'
import { WorkModule } from '../module/work.module'
import fs from 'fs'
import path from 'path'
import { IOffer, IOffers } from '../interface/offer.interface'
import { OfferModule } from '../module/offer.module'

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

  private findImg(_id: string): string {
    const supportedFormats = ['webp', 'png', 'jpg']
    const dir = path.join('images');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const files = fs.readdirSync(dir);
    const file = files.find(name => {
      for (const format of supportedFormats) {
        if (name.endsWith(`.${format}`) && name.split(`.${format}`)[0] === _id) {
          return true;
        }
      }
      return false;
    })
    
    return file as string;
  }

  private DeleteImg(_id: string) {
    const supportedFormats = ['webp', 'png', 'jpg']
    const dir = path.join('images');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const files = fs.readdirSync(dir);
    const file = files.find(name => {
      for (const format of supportedFormats) {
        if (name.endsWith(`.${format}`) && name.split(`.${format}`)[0] === _id) {
          return true;
        }
      }
      return false;
    })

    fs.unlinkSync(`${dir}/${file}`)
  }

async GetWorks() {
  try {
      await this.connect(this.DBWorks);
      const works = await WorkModule.find();
      const work_all: IWorks = {
          works: await Promise.all(
              works.map(async work => {
                  const img = this.findImg(work._id);
                  return {
                      _id: work._id,
                      title: work.title,
                      description: work.description,
                      url: work.url,
                      img: img,
                  };
              })
          ),
      };

      return work_all;
  } finally {
      await this.disconnect();
  }
}


  async GetOffers() {
    try {
      await this.connect(this.DBOffers);
      const offers = await OfferModule.find();
      const offer_all: IOffers = {
        offers: await Promise.all(
          offers.map(async offer => {
                  const img = this.findImg(offer._id);
                  return {
                      _id: offer._id,
                      title: offer.title,
                      description: offer.description,
                      price: offer.price,
                      img: img,
                  };
              })
          ),
      };

      return offer_all;
  } finally {
      await this.disconnect();
  }
  }

  async GetOffer(_id: string) {
    try {
      await this.connect(this.DBOffers)
      const offer_path = await OfferModule.findOne({_id: _id})
      if (offer_path === null) {
        throw new Error('Offer not found');
      }
      const img = this.findImg(_id)
      const offer: IOffer = {
        _id: offer_path._id,
        title: offer_path.title,
        description: offer_path.description,
        price: offer_path.price,
        img: img
      }
      return offer
    } finally {
      await this.disconnect()
    }
  }

  async AddOffer(offer: IOffer) {
    try {
      await this.connect(this.DBOffers)
      await OfferModule.create({_id: offer._id, title: offer.title, description: offer.description, price: offer.price})
    } finally {
      await this.disconnect()
    }
  }

  async AddWork(work: IWork) {
    try {
      await this.connect(this.DBWorks)
      await WorkModule.create({_id: work._id, title: work.title, description: work.description, url: work.url})
    } finally {
      await this.disconnect()
    }
  }

  async DeleteOffer(_id: string) {
    try {
      await this.connect(this.DBOffers)
      await OfferModule.deleteOne({_id: _id})
      this.DeleteImg(_id)
    } finally {
      await this.disconnect() 
    }   
  }

  async DeleteWork(_id: string) {
    try {
      await this.connect(this.DBWorks)
      await WorkModule.deleteOne({_id: _id})
      this.DeleteImg(_id)
    } finally {
      await this.disconnect() 
    }   
  }

  async UpdateOffer(offer: IOffer) {
    try{
      await this.connect(this.DBOffers)
      OfferModule.updateOne({_id: offer._id}, {title: offer.title, description: offer.description, price: offer.price})
    } finally {
      await this.disconnect()
    }
  }

  async UpdateWork(work: IWork) {  
    try{
      await this.connect(this.DBWorks)
      WorkModule.updateOne({_id: work._id}, {title: work.title, description: work.description, url: work.url})
    } finally {
      await this.disconnect()
    }
  }
}