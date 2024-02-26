import axios from 'axios'
import { IWork, IWorks } from '../interface/work.interface'
import { IOffers } from '../interface/offer.interface'

export class AdminService {
  static async GetWorks(): Promise<IWorks> {
    const { data } = await axios.get<IWorks>('http://localhost:5500/works')
    return data
  }

  static async GetOffers(): Promise<IOffers> {
    const { data } = await axios.get<IOffers>('http://localhost:5500/offers')
    return data
  } 

  static async DeleteWorks(_id: string) {
    await axios.post(`http://localhost:5500/delete_work/${_id}`)
  }

  static async DeleteOffers(_id: string) {
    await axios.post(`http://localhost:5500/delete_offer/${_id}`)
  }
}
