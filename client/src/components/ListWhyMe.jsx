import React from 'react';
import { whyMe } from "../API/whyMe";

function ListWhyMe() {
    return (
        <div className="why-me__row">
            {whyMe.map((el) => {
                return (
                    <div className="why-me__block" key={el.title}>
                        <div className="why-me__img">
                            <img src={el.img} alt="" />
                        </div>
                        <div className="why-me__title">
                            <span>{el.title}</span>
                        </div>
                        <div className="why-me__text">
                            <span>{el.text}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ListWhyMe;