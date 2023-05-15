import React, {lazy, ReactElement, Suspense} from 'react';
import type {SuspenseProps} from 'react';
import {Spin} from 'antd';
import type { RouteObject } from 'react-router-dom'
const Home = lazy(() => import('../components/layout'));
const SwiperCom = lazy(() => import('../components/swiper'));

const lazyLoad = (children: React.ReactNode): ReactElement => {
    return (
        <Suspense fallback={<Spin/>}>
            {children}
        </Suspense>
    );
};

const routers: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: 'swiper',
                element: lazyLoad(<SwiperCom />),
            }
        ]
    }
]
export default routers;