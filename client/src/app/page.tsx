import ListOffers from '@/components/ListOffers'
import ListWhyMe from '@/components/ListWhyMe'
import ListWork from '@/components/ListWork'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="content">
      <div className="contant__container">
        <div className="contant__hello">
          <div className="hello__row">
            <div className="row__who">
              <div className="who__title">
                <h1>Hello, I am Dmitry, Full-stack developer</h1>
              </div>
              <div className="who__text">
                <span>"Your Vision, Our Implementation: Full-stack Developer on Your Side."</span>
              </div>
            </div>
            <div className="row__avatar">
              <img src="/img/avatar.webp" alt="" />
            </div>
          </div>
        </div>
        <div className="content__my-skills">
          <div className="my-skills__title">
            <h2>My Skills</h2>
          </div>
          <div className="my-skills__row">
            <img src="/img/html.webp" alt="" />
            <img src="/img/css.webp" alt="" />
            <img src="/img/js.webp" alt="" />
            <img className="react" src="/img/react.webp" alt="" />
            <img src="/img/nodejs.webp" alt="" />
            <img src="/img/mysql.webp" alt="" />
          </div>
        </div>
        <div className="contant__why-me">
          <div className="why-me__title">
            <span>Why is it profitable to cooperate with me?</span>
          </div>
          <ListWhyMe />
        </div>
        <div className="contact__works">
          <div className="works__title">
            <span>Featured works</span>
            <Link href="/works">view all works</Link>
          </div>
          <ListWork />
        </div>
        <div className="content__offers">
          <div className="offers__title">
            <span>Featured offers</span>
            <Link href="/offers">view all offers</Link>
          </div>
          <ListOffers />
        </div>
        <div className="content__write-me">

        </div>
      </div>
    </main>
  )
}
