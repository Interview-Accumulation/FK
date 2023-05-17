import React, {lazy, ReactElement, Suspense} from 'react';
import type {SuspenseProps} from 'react';
import {Spin} from 'antd';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom'
const Layout = lazy(() => import('../components/layout'));
const Home = lazy(() => import('../components/home'));
const SwiperCom = lazy(() => import('../components/swiper'));
const About = lazy(() => import('../components/about'));
const ErrorPage = lazy(() => import('../components/404'));
const ThreeLevel = lazy(() => import('../components/threelevel'));
const UseParams = lazy(() => import('../components/useparams'));
const UseNavigate = lazy(() => import('../components/usenavigate'));

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
        element: <Layout />,
        children: [
            {
                path: 'home',
                element: lazyLoad(<Home />),
            },
            {
                path: 'swiper',
                element: lazyLoad(<SwiperCom />),
                caseSensitive: true
            },
            {
                path: 'about',
                element: lazyLoad(<About />),
                action: async () => {
                    console.log('about action');
                },
                loader: async () => {
                    return () => {
                        console.log('about loader')
                    };
                },
                errorElement: lazyLoad(<div>about error</div>),
            },
            {
                path: 'threelevel',
                element: lazyLoad(<ThreeLevel />),
                children: [
                    {
                        path: '1',
                        element: lazyLoad(<div>level 1</div>),
                    },
                    {
                        path: '2',
                        element: lazyLoad(<div>level 2</div>),
                    },
                    {
                        path: '3',
                        element: lazyLoad(<div>level 3</div>),
                    },
                    // 重定向
                    {
                        path: '/threelevel',
                        element: <Navigate to="/threelevel/1" />,
                    }
                ]
            },
            {
                path: 'useparams/:id/:name/:content',
                element: lazyLoad(<UseParams />),
            },
            {
                path: 'usenavigate',
                element: lazyLoad(<UseNavigate />),
            },
            // 重定向
            {
                path: '/',
                element: <Navigate to="/home" />,
            },
            // 404
            {
                path: '*',
                element: lazyLoad(<ErrorPage />),
            }
        ]
    },
]
export default routers;