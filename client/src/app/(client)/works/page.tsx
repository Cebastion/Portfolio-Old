import { FC } from "react";
import ListAllWorks from "../components/ListAllWorks";
import style from '../main.module.scss'

const page: FC = () => {
    return (
        <div className={style.contant__container}>
            <ListAllWorks />
        </div>
    );
};

export default page;
