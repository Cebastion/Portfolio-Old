"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

interface ImageList {
    img: string[];
}

const SwiperList = () => {
    const [Photos, SetPhotos] = useState<ImageList>({ img: [] });

    const getPhotos = async () => {
        const { data } = await axios.get("http://localhost:5500/photos");
        SetPhotos(data);
    };

    useEffect(() => {
        getPhotos();
    }, [])

    return (
        <Swiper spaceBetween={30} slidesPerView={3} autoplay speed={2000}>
            {Photos.img.map((img) => {
                return (
                    <SwiperSlide>
                        <Image src={img} alt="skill" />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default SwiperList;
