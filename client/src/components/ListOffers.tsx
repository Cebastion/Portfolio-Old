import Link from 'next/link'
import { offers } from "../API/offers"

import { FC } from 'react'

const ListOffers: FC = () => {
    const slicedOffers = offers.slice(0, 2)
    return (
        <div className="offers__coloum">
            {slicedOffers.map((offer) => {
                return (
                    <div className="offers__block" key={offer.id}>
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
                            <Link href={`/offer/${offer.id}`}>
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

export default ListOffers