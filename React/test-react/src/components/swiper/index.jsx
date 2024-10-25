import React from "react";
import MySwiper from "./Swiper";
import "./index.less";
import puppeteer from 'puppeteer-core/lib/esm/puppeteer/puppeteer-core-browser.js';
import { Button } from "antd";

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

    const handleScreenShot = async () => {
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        });
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/swiper');
        await page.screenshot({path: 'example.png'});
        await browser.close();
    }
        
    return (
        <div>
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
            <Button onClick={handleScreenShot}>截图</Button>
        </div>
        
    )
}
export default SwiperCom;