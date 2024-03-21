import { IWorks } from "@/app/(admin)/interface/work.interface"
import axios from "axios"

export class WorkService {
    async GetWorks() {
        const { data } = await axios.get<IWorks>('https://glorious-space-garbanzo-57x569xgqvghp6gq-5500.app.github.dev/works')
    return data
    }
}