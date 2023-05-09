import React from "react";
import MySwiper from "./Swiper";
import "./index.less";

const Children = (props) => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#c8f0e3'
        }}>
            <span>{props.content}</span>
        </div>
    )
}

const childrenList = [
    'slide 1',
    'slide 2',
    'slide 3',
    'slide 4',
    'slide 5',
    'slide 6',
    'slide 7',
    'slide 8',
    'slide 9',
    'slide 10'
]


const SwiperCom = () => {
    return (
        <div style={{height: '200px', width: '700px'}}>
            <MySwiper>
                {
                    childrenList.map((item, index) => (
                            <Children key={index} content={item} />
                        )
                    )
                }
            </MySwiper>
        </div>
    )
}
export default SwiperCom;