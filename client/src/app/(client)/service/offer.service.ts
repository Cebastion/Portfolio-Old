import { IOffer, IOffers } from "@/app/(admin)/interface/offer.interface"
import axios from "axios"

export class OfferService {
    async GetOffers() {
        const { data } = await axios.get<IOffers>('https://portfolio-server-2chb126qo-cebastion.vercel.app/offers')
        return data
    }

    async GetOffer(_id: string) {
        const { data } = await axios.get<IOffer>(`https://portfolio-server-2chb126qo-cebastion.vercel.app/offer/${_id}`)
        return data
    }
}