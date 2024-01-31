'use client'
import { FC } from 'react'

const page: FC = () => {
    const [ActivePop, SetActivePop] = useState('Works')

  return (
    <>
    <aside className='aside__menu'>
        <h1 className="menu__title">
            Admin Panel
        </h1>
        <nav className="menu">
            <ul className="menu_list">
                <li>Works</li>
                <li>Offers</li>
                <li>Skills</li>
            </ul>
        </nav>
    </aside>
    <main className="content">
        {ActivePop === 'Works' && (
            <div className="content__block">
                <nav className="block__menu">
                    <h2 className="block__title">Works</h2>
                    <button className="block__button__add">
                        Add Work
                    </button>
                </nav>
                <div className="block__list">
                    <div className="block__item">
                        <h3 className="item__title"></h3>
                        <nav className="item__menu">
                            <button className="item__edit">
                                Edit
                            </button>
                            <button className="item__delete">
                                Delete
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        )}
        {ActivePop === 'Offers' && (
            <div className="content__block">
                <nav className="block__menu">
                    <h2 className="block__title">Offers</h2>
                    <button className="block__button__add">
                        Add Offer
                    </button>
                </nav>
                <div className="block__list">
                    <div className="block__item">
                        <h3 className="item__title"></h3>
                        <nav className="item__menu">
                            <button className="item__edit">
                                Edit
                            </button>
                            <button className="item__delete">
                                Delete
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        )}
    </main>
    </>
  )
}

export default page