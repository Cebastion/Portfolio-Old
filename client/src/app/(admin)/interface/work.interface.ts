export interface IWork {
  _id: string;
  title: string;
  description: string;
  url: string;
}

export interface IWorks {
  works: IWork[];
}
