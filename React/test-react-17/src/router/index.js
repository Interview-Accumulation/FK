import {lazy} from 'react';

const Home = lazy(() => import('../components/layout'));
const StateCom = lazy(() => import('../components/stateCom'));
const UseCallbackCom = lazy(() => import('../components/useCallbackCom'));
const ClassCom = lazy(() => import('../components/classCom'));
const UseStateCom = lazy(() => import('../components/useStateCom'));
const KonvaCom = lazy(() => import('../components/konva'));

const routers = [
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: 'state',
                element: <StateCom />,
            },
            {
                path: 'usecallback',
                element: <UseCallbackCom />,
            },
            {
                path: 'class',
                element: <ClassCom />,
            },
            {
                path: 'usestate',
                element: <UseStateCom />,
            },
            {
                path: 'konva',
                element: <KonvaCom />,
            }
        ]
    }
]
export default routers;