import React from 'react'
import MySwiper from './Swiper'
import './index.less'

interface IChildrenProps {
    content: string
}

const Children = (props: IChildrenProps) => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#c8f0e3',
            color: 'black'
        }}>
            <span>{props.content}</span>
        </div>
    )
}

const childrenList: string[] = [
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

export default function Index() {
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
