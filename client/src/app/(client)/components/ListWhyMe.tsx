import React from 'react'
import { whyMe } from "../../../API/whyMe"
import style from '../main.module.scss'
import { FC } from 'react'

const ListWhyMe: FC = () => {
    return (
        <div className={style.why_me__row}>
            {whyMe.map((el) => {
                return (
                    <div className={style.why_me__block} key={el.title}>
                        <div className={style.why_me__img}>
                            <img src={el.img} alt="" />
                        </div>
                        <div className={style.why_me__title}>
                            <span>{el.title}</span>
                        </div>
                        <div className={style.why_me__text}>
                            <span>{el.text}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ListWhyMe