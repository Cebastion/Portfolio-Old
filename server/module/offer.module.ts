import mongoose from 'mongoose'
import { OfferSchema } from '../schema/offer.schema'
import { IOfferSchema } from '../interface/offer.interface'

export const OfferModule = mongoose.model<IOfferSchema>('Offers', OfferSchema)