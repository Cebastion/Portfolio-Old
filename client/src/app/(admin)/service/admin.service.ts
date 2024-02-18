import axios from 'axios'
import { IWork, IWorks } from '../interface/work.interface'

export class AdminService {
  static async GetWorks(): Promise<IWorks> {
    const { data } = await axios.get<IWorks>('http://localhost:5500/works')
    return data
  }

  static async DeleteWorks(_id: string) {
    await axios.post(`http://localhost:5500/delete_work/${_id}`)
  }
}
