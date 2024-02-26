import { IOffers } from "@/app/(admin)/interface/offer.interface"
import axios from "axios"

export class OfferService {
    async GetOffers() {
        const { data } = await axios.get<IOffers>('http://localhost:5500/offers')
        return data
    }
}