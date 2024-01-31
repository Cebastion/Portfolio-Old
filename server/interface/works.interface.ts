export interface IWork { 
  _id: string;
  title: string;
  description: string;
  url: string;
  img: string;
}

export interface IWorks {
  works: IWork[];
}

export interface IWorkSchema extends Document {
  _id: string;
  title: string;
  description: string;
  url: string;
  img: string;
}