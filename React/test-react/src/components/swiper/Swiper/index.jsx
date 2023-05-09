import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './index.css'


const MySwiper = (props) => {
  return (
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={3}
        navigation={true}
        pagination={{ clickable: true}}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        autoplay={{delay: 1000 * 3}}
        // loop={true}
        className="mySwiper"
      >
        {
            props.children?.map((item, index) => (
                <SwiperSlide key={index}>{item}</SwiperSlide>
            ))
        }
      </Swiper>
  );
};
export default MySwiper;
