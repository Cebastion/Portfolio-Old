export interface IOffer {
  _id: string;
  title: string;
  description: string;
  price: string;
  img: string;
}

export interface IOffers {
  offers: IOffer[]
}