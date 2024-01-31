interface Offer {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface Offers {
  offers: Offer[];
}