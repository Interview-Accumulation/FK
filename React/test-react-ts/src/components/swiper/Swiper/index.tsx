import React, { CSSProperties } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './index.css';
import lefticon from './assets/left.svg';
import righticon from './assets/right.svg';

interface IAutoPlayProps {
    isAutoplay: boolean;
    delay: number;
    disableOnInteraction: boolean;
    pauseOnMouseEnter: boolean;
}
interface INavigationProps {
    isNavigation: boolean;
    leftIcon: string;
    rightIcon: string;
    left: CSSProperties['left'];
    right: CSSProperties['right'];
    iconWidth?: CSSProperties['width'];
    iconHeight?: CSSProperties['height'];
}
interface IPaginationProps {
    isPagination: boolean;
    clickable: boolean;
}

interface ISwiperProps {
    children: React.ReactElement[];
    autoplay?: Partial<IAutoPlayProps>;
    className?: string;
    navigation?: Partial<INavigationProps>;
    pagination?: Partial<IPaginationProps>;
    slidesPerView?: number;
    spaceBetween?: number;
    onSwiper?: (swiper: any) => void;
    onSlideChange?: (swiper: any) => void;
}

const MySwiper = ({
    children,
    className = '',
    autoplay = {},
    navigation = {},
    pagination = {},
    slidesPerView = 2,
    spaceBetween = 30,
    onSwiper = (swiper: any) => console.log(swiper),
    onSlideChange = (swiper: any) => console.log('slide change', swiper)
}: ISwiperProps) => {
    const {
        isAutoplay = false,
        delay = 3000,
        disableOnInteraction = false,
        pauseOnMouseEnter = true
    } = autoplay;
    const {
        isNavigation = true,
        leftIcon = lefticon,
        rightIcon = righticon,
        left = '0px',
        right = '0px',
        iconWidth = '40px',
        iconHeight = '20px'
    } = navigation;
    const {
        isPagination = false,
        clickable = true
    } = pagination;

    return (
        <div className={"mySwiperWrap " + className}>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                navigation={isNavigation ? {
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next'
                } : false}
                pagination={isPagination ? {clickable} : false}
                scrollbar={{ draggable: true }}
                onSwiper={onSwiper}
                onSlideChange={onSlideChange}
                autoplay={isAutoplay ? {delay,disableOnInteraction,pauseOnMouseEnter} : false}
                // loop={true}
                className={"mySwiper"}
            >
                {
                    children?.map((item, index) => (
                        <SwiperSlide key={index}>{item}</SwiperSlide>
                    ))
                }
            </Swiper>
            <div className={`swiper-button-prev ${isNavigation ? '' : 'hide'}`} style={{left}}>
                <img src={leftIcon} height={iconHeight} width={iconWidth}></img>
            </div>
            <div className={`swiper-button-next ${isNavigation ? '' : 'hide'}`} style={{right}}>
                <img src={rightIcon} height={iconHeight} width={iconWidth}></img>
            </div>
        </div>
    );
};
export default MySwiper;