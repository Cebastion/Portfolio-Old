"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Autoplay } from "swiper/modules";

const SwiperList = () => {
    const [Photos, SetPhotos] = useState([]);

    const getPhotos = async () => {
        const { data } = await axios.get("https://portfolio-server-rho-blue.vercel.app/photos");
        SetPhotos(data);
    };

    useEffect(() => {
        getPhotos();
    }, [])

    return (
        <Swiper spaceBetween={0} slidesPerView={3} modules={[Autoplay]} autoplay={{"delay": 2500}} speed={1000}>
            {Photos.map((img, index) => {
                return (
                    <SwiperSlide key={index}>
                        <Image src={img} alt="skill" width={300} height={300}/>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default SwiperList;
