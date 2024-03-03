import mongoose from 'mongoose';
import {IConfigService} from '../config/config.interface';
import {IWork, IWorks} from '../interface/works.interface';
import {WorkModule} from '../module/work.module';
import {IOffer, IOffers} from '../interface/offer.interface';
import {OfferModule} from '../module/offer.module';
import { FireBaseService } from './firebase.service';

export class MongoDb {
  private DB: string;
  private firebase = new FireBaseService()
  constructor(private readonly configService: IConfigService) {
    this.DB = this.configService.get('URL_MONGO');
  }

  async connect() {
    await mongoose.connect(this.DB);
  }

  async disconnect() {
    await mongoose.disconnect();
  }

  async GetWorks() {
    try {
      
      const works = await WorkModule.find();
      const work_all: IWorks = {
        works: await Promise.all(
          works.map(async work => {
            return {
              _id: work._id,
              title: work.title,
              description: work.description,
              url: work.url,
              img: await this.firebase.GetPhoto(work._id),
            };
          }),
        ),
      };

      return work_all;
    } finally {
      
    }
  }

  async GetOffers() {
    try {
      
      const offers = await OfferModule.find();
      const offer_all: IOffers = {
        offers: await Promise.all(
          offers.map(async offer => {
            return {
              _id: offer._id,
              title: offer.title,
              description: offer.description,
              price: offer.price,
              img: await this.firebase.GetPhoto(offer._id),
            };
          }),
        ),
      };

      return offer_all;
    } finally {
      
    }
  }

  async GetOffer(_id: string) {
    try {
      
      const offer_path = await OfferModule.findOne({_id: _id});
      if (offer_path === null) {
        throw new Error('Offer not found');
      }
      const offer: IOffer = {
        _id: offer_path._id,
        title: offer_path.title,
        description: offer_path.description,
        price: offer_path.price,
        img: await this.firebase.GetPhoto(offer_path._id),
      };
      return offer;
    } finally {
      
    }
  }

  async AddOffer(offer: IOffer) {
    try {
      
      await OfferModule.create({
        _id: offer._id,
        title: offer.title,
        description: offer.description,
        price: offer.price,
        img: await this.firebase.GetPhoto(offer._id)
      });
    } finally {
      
    }
  }

  async AddWork(work: IWork) {
    try {
      
      await WorkModule.create({
        _id: work._id,
        title: work.title,
        description: work.description,
        url: work.url,
        img: await this.firebase.GetPhoto(work._id)
      });
    } finally {
      
    }
  }

  async DeleteOffer(_id: string) {
    try {
      
      await this.firebase.DeletePhoto(_id);
      await OfferModule.deleteOne({_id: _id});
    } finally {
      
    }
  }

  async DeleteWork(_id: string) {
    try {
      
      await this.firebase.DeletePhoto(_id);
      await WorkModule.deleteOne({_id: _id});
    } finally {
      
    }
  }

  async UpdateOffer(offer: IOffer) {
    try {
      
      await OfferModule.updateOne(
        {_id: offer._id},
        {
          title: offer.title,
          description: offer.description,
          price: offer.price,
        },
      );
    } finally {
      
    }
  }

  async UpdateWork(work: IWork) {
    try {
      
      await WorkModule.updateOne(
        {_id: work._id},
        {title: work.title, description: work.description, url: work.url},
      );
    } finally {
      
    }
  }
}
