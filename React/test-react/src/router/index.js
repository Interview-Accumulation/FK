import {lazy} from 'react';

const Home = lazy(() => import('../components/layout'));
const StateCom = lazy(() => import('../components/stateCom'));
const UseCallbackCom = lazy(() => import('../components/useCallbackCom'));
const ClassCom = lazy(() => import('../components/classCom'));
const UseStateCom = lazy(() => import('../components/useStateCom'));
const UseMemoCom = lazy(() => import('../components/useMemoCom'));
const UseContextCom = lazy(() => import('../components/useContextCom'));
const routers = [
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: 'state',
                element: <StateCom />,
                index: true,
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
                path: 'usememo',
                element: <UseMemoCom />,
            },
            {
                path: 'usecontext',
                element: <UseContextCom />,
            }
        ]
    }
]
export default routers;