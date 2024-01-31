import { Schema } from 'mongoose'

export const WorkSchema = new Schema({
  _id: String,
  title: String,
  description: String,
  url: String,
  img: String,
})