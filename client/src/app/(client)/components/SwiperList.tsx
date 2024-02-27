'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

const SwiperList = () => {
    return (
        <Swiper spaceBetween={30} slidesPerView={3} autoplay speed={2000}>
            <SwiperSlide>
                <Image src='' alt="skill"/>
            </SwiperSlide>
        </Swiper>
    );
};

export default SwiperList;
