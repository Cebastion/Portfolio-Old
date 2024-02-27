import ListWhyMe from './components/ListWhyMe'
import ListWork from './components/ListWork'
import Image from 'next/image'
import Link from 'next/link'
import style from './main.module.scss'
import ListOffers from './components/ListOffers'
import SwiperList from './components/SwiperList'

export default function Home() {
  return (
    <main className={style.content}>
      <div className={style.contant__container}>
        <div className={style.contant__hello}>
          <div className={style.hello__row}>
            <div className={style.row__who}>
              <div className={style.who__title}>
                <h1>Hello, I am Dmytro, Full-stack developer</h1>
              </div>
              <div className={style.who__text}>
                <span>"Your Vision, Our Implementation: Full-stack Developer on Your Side."</span>
              </div>
            </div>
            <div className={style.row__avatar}>
              <img src="/img/avatar.webp" alt="" />
            </div>
          </div>
        </div>
        <div className={style.content__my_skills}>
          <div className={style.my_skills__title}>
            <h2>My Skills</h2>
          </div>
          <div className={style.my_skills__row}>
            <SwiperList/>
            <img src="/img/html.webp" alt="" />
            <img src="/img/css.webp" alt="" />
            <img src="/img/js.webp" alt="" />
            <img className={style.react} src="/img/react.webp" alt="" />
            <img src="/img/nodejs.webp" alt="" />
            <img src="/img/mysql.webp" alt="" />
          </div>
        </div>
        <div className={style.contant__why_me}>
          <div className={style.why_me__title}>
            <span>Why is it profitable to cooperate with me?</span>
          </div>
          <ListWhyMe />
        </div>
        <div className={style.contact__works}>
          <div className={style.works__title}>
            <span>Featured works</span>
            <Link href="/works">view all works</Link>
          </div>
          <ListWork />
        </div>
        <div className={style.content__offers}>
          <div className={style.works__title}>
            <span>Featured offers</span>
            <Link href="/offers">view all offers</Link>
          </div>
          <ListOffers />
        </div>
      </div>
    </main>
  )
}
