import { IWorks } from "@/app/(admin)/interface/work.interface"
import axios from "axios"

export class WorkService {
    async GetWorks() {
        const { data } = await axios.get<IWorks>('https://portfolio-server-rho-blue.vercel.app/works')
    return data
    }
}