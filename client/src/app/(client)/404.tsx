import Link from 'next/link'
import { FC } from 'react'
import style from './main.module.scss'

const ErrorPage: FC = () => {
  return (
    <div className="wellaper">
            <main className={style.content}>
                <div className={style.content__error}>
                    <h2>Error 404</h2>
                    <p>Oops, please go back to the <Link href="/">main page</Link></p>
                </div>
            </main>
        </div>
  )
}

export default ErrorPage