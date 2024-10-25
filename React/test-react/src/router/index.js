import {lazy, Suspense} from 'react';
import {Spin} from 'antd';

const Home = lazy(() => import('../components/layout'));
const StateCom = lazy(() => import('../components/stateCom'));
const UseCallbackCom = lazy(() => import('../components/useCallbackCom'));
const ClassCom = lazy(() => import('../components/classCom'));
const UseStateCom = lazy(() => import('../components/useStateCom'));
const UseMemoCom = lazy(() => import('../components/useMemoCom'));
const UseContextCom = lazy(() => import('../components/useContextCom'));
const SwiperCom = lazy(() => import('../components/swiper'));
const UploadPic = lazy(() => import('../components/uploadPic'));

// import Home from '../components/layout';
// import StateCom from '../components/stateCom';
// import UseCallbackCom from '../components/useCallbackCom';
// import ClassCom from '../components/classCom';
// import UseStateCom from '../components/useStateCom';
// import UseMemoCom from '../components/useMemoCom';
// import UseContextCom from '../components/useContextCom';
// import SwiperCom from '../components/swiper';

const lazyLoad = (children) => {
    return (
        <Suspense fallback={<Spin/>}>
            {children}
        </Suspense>
    )
}


const routers = [
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: 'state',
                element: lazyLoad(<StateCom />),
                index: true,
            },
            {
                path: 'usecallback',
                element: lazyLoad(<UseCallbackCom />),
            },
            {
                path: 'class',
                element: lazyLoad(<ClassCom />),
            },
            {
                path: 'usestate',
                element: lazyLoad(<UseStateCom />),
            },
            {
                path: 'usememo',
                element: lazyLoad(<UseMemoCom />),
            },
            {
                path: 'usecontext',
                element: lazyLoad(<UseContextCom />),
            },
            {
                path: 'swiper',
                element: lazyLoad(<SwiperCom />),
            },
            {
                path: 'upload',
                element: lazyLoad(<UploadPic />),
            }
        ]
    }
]
export default routers;