import { IOffer, IOffers } from "@/app/(admin)/interface/offer.interface"
import axios from "axios"

export class OfferService {
    async GetOffers() {
        const { data } = await axios.get<IOffers>('http://localhost:5500/offers')
        return data
    }

    async GetOffer(_id: string) {
        const { data } = await axios.get<IOffer>(`http://localhost:5500/offer/${_id}`)
        return data
    }
}