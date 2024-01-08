import { works } from "../API/works"
import { FC } from 'react'

const ListWork: FC = () => {
    const slicedWorks = works.slice(0, 2)
    return (
        <div className="works__coloum">
            {slicedWorks.map((work) => {
                return (
                    <div className="works__block" key={work.id}>
                        <div className="works__img">
                            <img src={work.img} alt="" />
                        </div>
                        <div className="works__block-coloum">
                            <div className="works__title">
                                <span>{work.title}</span>
                            </div>
                            <div className="works__text">
                                <span>{work.text}</span>
                            </div>
                            <div className="works__link">
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