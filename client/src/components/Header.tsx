import Link from 'next/link'
import '../css/header.css'


import { FC } from 'react'

const Header: FC = () => {
    return (
        <header className="header">
            <div className="header__container">
                <ul className="header__menu">
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