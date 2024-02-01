import axios from 'axios'
import { IWork } from '../interface/work.interface'

export class AdminService {
  CreateWork(work: IWork) {
    axios.post('http://localhost:5500/add_work', work)
  }
}