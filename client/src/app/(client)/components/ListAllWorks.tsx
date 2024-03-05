'use client'
import { IWorks } from "@/app/(admin)/interface/work.interface"
import style from '../main.module.scss'
import { FC, useEffect, useState } from 'react'
import { WorkService } from "../service/work.service"

const ListAllWorks: FC = () => {
    const [Works, SetWorks] = useState<IWorks>({ works: [] })

    async function GetWorks() {
        const workService = new WorkService()
        const works = await workService.GetWorks()
        SetWorks(works)
    }

    useEffect(() => {
        GetWorks()
    }, [])

    return (
        <div className={style.works__coloum}>
            {Works.works.map((work) => {
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

export default ListAllWorks