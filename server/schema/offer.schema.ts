import { Schema } from 'mongoose'

export const OfferSchema = new Schema({
  _id: String,
  title: String,
  description: String,
  price: Number,
  image: String,
})