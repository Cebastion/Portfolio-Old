import mongoose from 'mongoose';
import {IConfigService} from '../config/config.interface';
import {IWork, IWorks} from '../interface/works.interface';
import {WorkModule} from '../module/work.module';
import {IOffer, IOffers} from '../interface/offer.interface';
import {OfferModule} from '../module/offer.module';
import { FireBaseService } from './firebase.service';

export class MongoDb {
  private DBOffers: string;
  private DBWorks: string;
  private firebase = new FireBaseService()
  constructor(private readonly configService: IConfigService) {
    this.DBOffers = this.configService.get('URL_MONGO_OFFERS');
    this.DBWorks = this.configService.get('URL_MONGO_WORKS');
  }

  private async connect(db: string) {
    await mongoose.connect(db);
  }

  private async disconnect() {
    await mongoose.disconnect();
  }

  async GetWorks() {
    try {
      await this.connect(this.DBWorks);
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
      await this.disconnect();
    }
  }

  async GetOffer(_id: string) {
    try {
      await this.connect(this.DBOffers);
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
      await this.disconnect();
    }
  }

  async AddOffer(offer: IOffer) {
    try {
      await this.connect(this.DBOffers);
      await OfferModule.create({
        _id: offer._id,
        title: offer.title,
        description: offer.description,
        price: offer.price,
        img: await this.firebase.GetPhoto(offer._id)
      });
    } finally {
      await this.disconnect();
    }
  }

  async AddWork(work: IWork) {
    try {
      await this.connect(this.DBWorks);
      await WorkModule.create({
        _id: work._id,
        title: work.title,
        description: work.description,
        url: work.url,
        img: await this.firebase.GetPhoto(work._id)
      });
    } finally {
      await this.disconnect();
    }
  }

  async DeleteOffer(_id: string) {
    try {
      await this.connect(this.DBOffers);
      await this.firebase.DeletePhoto(_id);
      await OfferModule.deleteOne({_id: _id});
    } finally {
      await this.disconnect();
    }
  }

  async DeleteWork(_id: string) {
    try {
      await this.connect(this.DBWorks);
      await this.firebase.DeletePhoto(_id);
      await WorkModule.deleteOne({_id: _id});
    } finally {
      await this.disconnect();
    }
  }

  async UpdateOffer(offer: IOffer) {
    try {
      await this.connect(this.DBOffers);
      OfferModule.updateOne(
        {_id: offer._id},
        {
          title: offer.title,
          description: offer.description,
          price: offer.price,
        },
      );
    } finally {
      await this.disconnect();
    }
  }

  async UpdateWork(work: IWork) {
    try {
      await this.connect(this.DBWorks);
      WorkModule.updateOne(
        {_id: work._id},
        {title: work.title, description: work.description, url: work.url},
      );
    } finally {
      await this.disconnect();
    }
  }
}
