import Link from 'next/link'
import style from './header.module.scss'
import { FC } from 'react'

const Header: FC = () => {
    return (
        <header className={style.header}>
            <div className={style.header__container}>
                <ul className={style.header__menu}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/works">Works</Link></li>
                    <li><Link href="/offers">Offers</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default Header