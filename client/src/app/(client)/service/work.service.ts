import { IWorks } from "@/app/(admin)/interface/work.interface"
import axios from "axios"

export class WorkService {
    async GetWorks() {
        const { data } = await axios.get<IWorks>('http://localhost:5500/works')
    return data
    }
}