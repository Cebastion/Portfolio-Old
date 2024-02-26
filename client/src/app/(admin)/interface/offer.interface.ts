export interface IOffer {
  _id: string;
  title: string;
  description: string;
  price: number;
  img: string;
}

export interface IOffers {
  offers: IOffer[]
}