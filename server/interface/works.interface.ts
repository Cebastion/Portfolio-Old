interface IWork { 
  _id: string;
  title: string;
  description: string;
  url: string;
  img: string;
}

interface IWorks {
  works: IWork[];
}