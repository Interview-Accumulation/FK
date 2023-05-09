## React Router
- react-router等前端路由的原理大致相同，可以实现无刷新的条件下切换显示不同的页面。
- 路由的本质就是页面的URL发生改变时，页面的显示结果可以根据URL的变化而变化，但是页面不会刷新。
- 因此，可以通过前端路由可以实现单页(SPA)应用

### 路由模式
- BrowserRouter、HashRouter：使用两者作为最顶层组件包裹其他组件，分别匹配history模式和hash模式





### 常见问题
#### 使用路由懒加载切换路由时出现闪屏现象
- 原因：路由懒加载的组件在加载时，会先显示Suspense组件中的fallback组件，然后再显示路由组件，因此会出现闪屏现象，在切换路由是出现闪屏，是由于所有层级公用一个Suspense组件导致的。
- 解决方案：
  - 在每个路由组件中都使用Suspense组件包裹，这样每个路由组件都会有自己的Suspense组件，就不会出现闪屏现象了。
  - router配置，[具体见](./test-react/src/router/index.js)
```js
import {lazy, Suspense} from 'react';
import {Spin} from 'antd';
const Home = lazy(() => import('../components/layout'));
const StateCom = lazy(() => import('../components/stateCom'));
const UseCallbackCom = lazy(() => import('../components/useCallbackCom'));

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
            }
        ]
    }
]
export default routers;
```
