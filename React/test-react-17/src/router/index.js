import {lazy} from 'react';

const Home = lazy(() => import('../components/layout'));
const StateCom = lazy(() => import('../components/stateCom'));
const UseCallbackCom = lazy(() => import('../components/useCallbackCom'));
const ClassCom = lazy(() => import('../components/classCom'));
const UseStateCom = lazy(() => import('../components/useStateCom'));

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
            }
        ]
    }
]
export default routers;