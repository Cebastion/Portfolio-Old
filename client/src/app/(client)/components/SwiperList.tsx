"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const SwiperList = () => {
    const [Photos, SetPhotos] = useState([]);

    const getPhotos = async () => {
        const { data } = await axios.get("https://glorious-space-garbanzo-57x569xgqvghp6gq-5500.app.github.dev/photos");
        SetPhotos(data);
    };

    useEffect(() => {
        getPhotos();
    }, [])

    return (
        <Swiper spaceBetween={30} slidesPerView={3} autoplay speed={2000}>
            {Photos.map((img, index) => {
                return (
                    <SwiperSlide key={index}>
                        <Image src={img} alt="skill" />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default SwiperList;
