import axios from 'axios'
import { IWork, IWorks } from '../interface/work.interface'
import { IOffers } from '../interface/offer.interface'

export class AdminService {
  static async GetWorks(): Promise<IWorks> {
    const { data } = await axios.get<IWorks>('https://portfolio-old-server.vercel.app/works')
    return data
  }

  static async GetOffers(): Promise<IOffers> {
    const { data } = await axios.get<IOffers>('https://portfolio-old-server.vercel.app/offers')
    return data
  } 

  static async DeleteWorks(_id: string) {
    await axios.post(`https://portfolio-old-server.vercel.app/delete_work/${_id}`)
  }

  static async DeleteOffers(_id: string) {
    await axios.post(`https://portfolio-old-server.vercel.app/delete_offer/${_id}`)
  }
}
