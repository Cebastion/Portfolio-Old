'use client'
import { NextPage } from 'next'
import { useState } from 'react'
import { ILetter } from '../interface/letter.interface'
import axios from 'axios'
import style from '../SCSS/contact.module.scss'

interface Props {}

const Page: NextPage<Props> = ({}) => {
    const [Letter, SetLetter] = useState<ILetter>({
        nameproject: '',
        email: '',
        offer: ''
    })

    function SendEmail() {
        axios.post('https://portfolio-old-server.vercel.app/sendEmail', Letter)
    }

    return (
    <main className={style.content}>
        <div className={style.contant__container}>
            <div className={style.content__form_email}>
                <div className={style.email__title}>
                    <h2>Send me an offer!</h2>
                </div>
                <form action="" className={style.email__form} onSubmit={SendEmail}>
                    <label htmlFor="nameproject">Name project:</label>
                    <input type="text" name='nameproject' value={Letter.nameproject} onChange={(e) => SetLetter({...Letter, nameproject: e.target.value})}/>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" value={Letter.email} onChange={(e) => SetLetter({...Letter, email: e.target.value})} />
                    <label htmlFor="offer">Offer</label>
                    <textarea name="offer" value={Letter.offer} onChange={(e) => SetLetter({...Letter, offer: e.target.value})}></textarea>
                    <button type='submit'>Send</button>
                </form>
            </div>
        </div>
    </main>
    )
}

export default Page