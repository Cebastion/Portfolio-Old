'use client'
import { useSearchParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { OfferService } from '../../service/offer.service'
import { IOffer } from '@/app/(admin)/interface/offer.interface'
import Image from 'next/image'
import Link from 'next/link'
import style from '../../SCSS/offer.module.scss'

const page: FC = () => {
  const searchParams = useSearchParams()
  const _id = searchParams.get('id')
  const [Offer, SetOffer] = useState<IOffer>({
    _id: '',
    title: '',
    img: '',
    description: '',
    price: 0,
  })

  const GetOffer = async () => {
    const offerService = new OfferService()
    if(_id){
      const offer = await offerService.GetOffer(_id)
      SetOffer(offer)
    }
  }

  useEffect(() => {
    GetOffer()
  }, [])

  
  return (
    <main className="content">
      <div className="contant__conatiner">
        <div className="content__offer">
            <div className="offer__block">
                <div className={style.offer__title}>
                  <h2>{Offer.title}</h2>
                </div>
                <div className={style.offer__img}>
                  <Image src={Offer.img} alt=""/>
                </div>
                <div className={style.offer__description}>
                  <div className={style.description__title}>
                    <span>What you deliver with this Offer</span>
                  </div>
                  <div className={style.description__text}>
                    <span>{Offer.description}</span>
                  </div>
                </div>
                <div className={style.offer__order}>
                  <div className={style.order__price}>
                    <span>{Offer.price}$</span>
                  </div>
                  <Link href="/contact">
                    <button className={style.offer__button}>Order</button>
                  </Link>
                </div>
            </div>
        </div>
      </div>
    </main>
  )
}

export default page