'use client'
import { FC, useEffect, useState } from 'react'
import style from '../main.module.scss'
import { IWorks } from "@/app/(admin)/interface/work.interface"
import { WorkService } from "../service/work.service"


const ListWork: FC = () => {
    const [Works, SetWorks] = useState<IWorks>({ works: [] })

    async function GetWorks() {
        const workService = new WorkService()
        const works = await workService.GetWorks()
        SetWorks(works)
    }

    useEffect(() => {
        GetWorks()
    }, [])

    const slicedWorks = Works.works.slice(0, 2)
    return (
        <div className={style.works__coloum}>
            {slicedWorks.map((work) => {
                return (
                    <div className={style.works__block} key={work._id}>
                        <div className={style.works__img}>
                            <img src={work.img} alt="" />
                        </div>
                        <div className={style.works__block_coloum}>
                            <div className={style.works__title}>
                                <span>{work.title}</span>
                            </div>
                            <div className={style.works__text}>
                                <span>{work.description}</span>
                            </div>
                            <div className={style.works__link}>
                                <a href={work.url}>{work.url}</a>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ListWork