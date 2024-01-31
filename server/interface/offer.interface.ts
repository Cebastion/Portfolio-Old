export interface Offer {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface Offers {
  offers: Offer[];
}
export interface IOfferSchema extends Document {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}