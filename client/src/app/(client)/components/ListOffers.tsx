import Link from 'next/link'
import style from '../SCSS/offers.module.scss'
import { FC, useEffect, useState } from 'react'
import { IOffers } from '@/app/(admin)/interface/offer.interface'
import { OfferService } from '../service/offer.service'

const ListOffers: FC = () => {
    const [Offers, SetOffers] = useState<IOffers>({ offers: [] })

    const GetData = async () => {
        const offerService = new OfferService()
        const offers: IOffers = await offerService.GetOffers()
        SetOffers(offers)
    }

    useEffect(() => {
        GetData()
    })
    const slicedOffers = Offers.offers.slice(0, 2)
    return (
        <div className={style.offers__coloum}>
            {slicedOffers.map((offer) => {
                return (
                    <div className={style.offers__block} key={offer._id}>
                        <div className={style.offers__img}>
                            <img src={offer.img} alt="" />
                        </div>
                        <div className={style.offers__row}>
                            <div className={style.offers__block_title}>
                                <span>{offer.title}</span>
                            </div>
                            <div className={style.offers__price}>
                                <span>{offer.price}$</span>
                            </div>
                        </div>
                        <div className={style.offers__row}>
                            <div className={style.offers__avatar}>
                                <div className={style.avatar__img}>
                                    <img src="/img/avatar.webp" alt="" />
                                </div>
                                <div className={style.avatar__name}>
                                    <span>Dmytro K.</span>
                                    <div className={style.avater__country}>
                                        <span>UKRAINE</span>
                                    </div>
                                </div>
                            </div>
                            <Link href={`/offer/${offer._id}`}>
                                <button className={style.offers__button}>
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

export default ListOffers