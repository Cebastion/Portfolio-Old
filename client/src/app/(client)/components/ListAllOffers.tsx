'use client'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { IOffers } from '@/app/(admin)/interface/offer.interface.js'
import { OfferService } from '../service/offer.service.js'

const ListAllOffers: FC = () => {
    const [Offers, SetOffers] = useState<IOffers>({ offers: [] })

    const GetData = async () => {
        const offerService = new OfferService()
        const offers: IOffers = await offerService.GetOffers()
        SetOffers(offers)
    }

    useEffect(() => {
        GetData()
    })

    return (
        <div className="offers__coloum-all">
            {Offers.offers.map((offer) => {
                return (
                    <div className="offers__block-all" key={offer._id}>
                        <div className="offers__img">
                            <img src={offer.img} alt="" />
                        </div>
                        <div className="offers__row">
                            <div className="offers__block-itle">
                                <span>{offer.title}</span>
                            </div>
                            <div className="offers__price">
                                <span>{offer.price}$</span>
                            </div>
                        </div>
                        <div className="offers__row">
                            <div className="offers__avatar">
                                <div className="avatar__img">
                                    <img src="/img/avatar.webp" alt="" />
                                </div>
                                <div className="avatar__name">
                                    <span>Dmytro K.</span>
                                    <div className="avater__country">
                                        <span>UKRAINE</span>
                                    </div>
                                </div>
                            </div>
                            <Link href={`/offer/${offer._id}`}>
                                <button className="offers__button">
                                    VIEW
                                </button>
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ListAllOffers