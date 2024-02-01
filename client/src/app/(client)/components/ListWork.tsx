import { works } from "../../../API/works"
import { FC } from 'react'
import style from '../main.module.scss'


const ListWork: FC = () => {
    const slicedWorks = works.slice(0, 2)
    return (
        <div className={style.works__coloum}>
            {slicedWorks.map((work) => {
                return (
                    <div className={style.works__block} key={work.id}>
                        <div className={style.works__img}>
                            <img src={work.img} alt="" />
                        </div>
                        <div className={style.works__block_coloum}>
                            <div className={style.works__title}>
                                <span>{work.title}</span>
                            </div>
                            <div className={style.works__text}>
                                <span>{work.text}</span>
                            </div>
                            <div className={style.works__link}>
                                <a href={work.link}>{work.link}</a>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ListWork