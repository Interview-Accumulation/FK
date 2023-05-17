## React Router
- react-router等前端路由的原理大致相同，可以实现无刷新的条件下切换显示不同的页面。
- 路由的本质就是页面的URL发生改变时，页面的显示结果可以根据URL的变化而变化，但是页面不会刷新。
- 因此，可以通过前端路由可以实现单页(SPA)应用

react-router主要分成了几个不同的包：
* `react-router`: 路由的核心库
* `react-router-dom`： 基于 react-router，加入了在浏览器运行环境下的一些功能，如`<BrowserRouter>`等
* `react-router-native`：基于 react-router，加入了 react-native 运行环境下的一些功能，如`<NativeRouter>`等
* `react-router-config`: 用于配置静态路由的工具库

### React Router 6 和 5.x版本的区别
1. 内置组件变化：移除`<Switch/>` ，新增`<Routes/>`等
2. 语法的变化：component={About} 变为 element={<About/>}等。
3. 新增多个hook：`useParams`、`useNavigate`、`useMatch`等
4. 官方明确推荐函数式组件


### 路由模式
- BrowserRouter、HashRouter：使用两者作为最顶层组件包裹其他组件，分别匹配history模式和hash模式

### 常用组件
1. [`<BrowserRouter>`](https://reactrouter.com/en/6.11.1/router-components/browser-router)
   - 用于包裹路由组件，基于HTML5中的history API进行路由控制
   - `<BrowserRouter>` 使用纯净的 URL 将当前位置存储在浏览器的地址栏中，并使用浏览器的内置历史堆栈进行导航。
2. [`<HashRouter>`](https://reactrouter.com/en/6.11.1/router-components/hash-router)
   - 同BrowserRouter一样，也用于包裹路由组件，区别在于使用URL中的hash值（#）来管理路由


!!! info 注意:官方强烈建议非必要情况下不要使用`HashRouter`

3. `<Routes/>` 与 `<Route/>`
   1. v6版本中移出了先前的`<Switch>`，引入了新的替代者：`<Routes>`。
   2. `<Routes>` 和 `<Route>`要配合使用，且必须要用`<Routes>`包裹`<Route>`。
   3. `<Route>` 相当于一个 if 语句，如果其路径与当前 URL 匹配，则呈现其对应的组件。
   4. `<Route caseSensitive>` 属性用于指定：匹配时是否区分大小写（默认为 false）。
   5. 当URL发生变化时，`<Routes>` 都会查看其所有子 `<Route>` 元素以找到最佳匹配并呈现组件 。
   6. `<Route>` 也可以嵌套使用，且可配合useRoutes()配置 “路由表” ，但需要通过 `<Outlet>` 组件来渲染其子路由。
```js
 <Routes>
     // path属性用于定义路径，element属性用于定义当前路径所对应的组件
     <Route path="/login" element={<Login />}></Route>
 
 	/* 用于定义嵌套路由，home是一级路由，对应的路径/home */
     <Route path="home" element={<Home />}>
        /* test1 和 test2 是二级路由,对应的路径是/home/test1 或 /home/test2 */
       <Route path="test1" element={<Test/>}></Route>
       <Route path="test2" element={<Test2/>}></Route>
 	</Route>
 	
 	// Route也可以不写element属性, 这时就是用于展示嵌套的路由 .所对应的路径是/users/xxx
     <Route path="users">
        <Route path="xxx" element={<Demo />} />
     </Route>
 </Routes>
```
4. `<Link>`
   1. 作用: 修改URL，且不发送网络请求（路由链接）。
   2. 注意: 外侧需要用`<BrowserRouter>`或`<HashRouter>`包裹。
```jsx
 import { Link } from "react-router-dom";
 
 function Test() {
   return (
     <div>
     	<Link to="/路径">按钮</Link>
     </div>
   );
 }

```
5. `<NavLink>`
   - 作用: 与`<Link>`组件类似，且可实现导航的“高亮”效果。

6. `<Navigate>`
   - 作用：只要<Navigate>组件被渲染，就会修改路径，切换视图
   - replace属性用于控制跳转模式（push 或 replace，默认是push）
```ts
declare function Navigate(props: NavigateProps): null;

interface NavigateProps {
  to: To;
  replace?: boolean;
  state?: any;
  relative?: RelativeRoutingType;
}
```
7. [`<Outlet>`](https://reactrouter.com/en/6.11.1/components/outlet)
   - 当`<Route>`产生嵌套时，渲染其对应的后续子路由

### 常用Hooks
1. useRoutes
   - 根据路由表，动态创建`<Routes>` 和 `<Route>`
   - 示例如下
```tsx
// 在router/index中创建路由表
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
// 在App.tsx中，映入路由表，注册路由
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routers from './router';
import { Suspense } from 'react';

function App() {
// 由路由表生成对应的路由规则
  const Element = () => useRoutes(routers);
  return (
    <>
      <Suspense fallback={<Spin/>}>
        <Router>
            <Element />
        </Router>
      </Suspense>
    </>
  )
}

export default App
```

2. useNavigate
   - 返回一个函数用来实现编程式导航
```tsx
 import React from 'react'
 import {useNavigate} from 'react-router-dom'
 
 export default function Demo() {
   const navigate = useNavigate()
   const handle = () => {
     //第一种使用方式：指定具体的路径
     navigate('/login', {
       replace: false,
       state: {a:1, b:2}
     }) 
     //第二种使用方式：传入数值进行前进或后退，类似于5.x中的 history.go()方法
     navigate(-1)
   }
   
   return (
     <div>
       <button onClick={handle}>跳转</button>
     </div>
   )
 }

```
3. useParams
   - 返回当前匹配路由的 `params` 参数
4. useSearchParams
   - 用于读取和修改当前位置的 URL 中的查询字符串,返回一个包含两个值的数组，内容分别为：当前的seaech参数、更新search的函数

5. useLocation
   - 用于获取当前 location 信息, 对标5.x中的路由组件的location属性
6. useMatch
   - 返回当前匹配信息，对标5.x中的路由组件的match属性。
**3-6代码示例**
```tsx
// router参数配置
{
    path: 'useparams/:id/:name/:content',
    element: lazyLoad(<UseParams />),
},
// 路由组件跳转
<Link to={'/useparams/testID/testName/testContent?search1=testsearch&search2=testsearch2'} state={{state1: 'Test State'}}>
    useparams
</Link>
// UseParams 组件示例
import React from 'react'
import { useMatch, useParams, useSearchParams, useLocation } from 'react-router-dom'

export default function Index() {
    const match = useMatch('/useparams/:id/:name/:content')
    const params = useParams()
    const [search, setSearch] = useSearchParams();
    const location = useLocation();

    const { state: {
        state1
    }} = location;

    console.log(match); // {params: {id: 'testID', name: 'testName', content: 'testContent'}, pathname: '/useparams/testID/testName/testContent', pathnameBase: '/useparams/testID/testName/testContent', pattern: {…}}
    console.log(params); // {id: 'testID', name: 'testName', content: 'testContent'}

    console.log(search.get('search1')); // testsearch
    console.log(search.get('search2')); // testsearch2

    console.log('location', location);
    return (
        <div>
            <h4>id: {params.id}</h4>
            <h4>name: {params.name}</h4>
            <h4>content: {params.content}</h4>
            <h4>staet1: {state1}</h4>
            <button onClick={() => setSearch('search1=testsearch')}>set search1</button>
        </div>
    )
}
```

7. useInRouterContext
   - 如果组件在 `<Router>` 的上下文中呈现，则 useInRouterContext 钩子返回 true，否则返回 false。
```jsx
import React from 'react'
import { useInRouterContext } from 'react-router-dom'

export default function Index() {
// 使用 useInRouterContext() hooks 检查当前组件是否处于路由的上下文环境
  console.log('是否处于路由的上下文环境？', useInRouterContext());
  return (
    <div>About</div>
  )
}
```

8. useNavigationType
   - 返回当前的导航类型(**PUSH、REPLACE**)
```jsx
import React from 'react'
import { useNavigationType } from 'react-router-dom'

export default function About() {
  // 调用 useNavigationType() hooks，可以获取当前路由是以那种跳转模式跳转过来的（PUSH、REPLACE）
  console.log(useNavigationType());
  return (
    <div>
      <h3>我是 About 组件的内容</h3>
    </div>
  )
}
```
9. useOutlet
   - 用来呈现当前组件中渲染的嵌套路由
   - 若当前组件中挂载有`<OutLet>`组件，则可用useOutlet获取嵌套路由对象，否则返回null
10. useResolvedPath
    - 给定一个 URL值，解析其中的：path、search、hash值。
```jsx
  const resolvedPath = useResolvedPath('/about?search1=1&search2=2');
  console.log('resolvedPath', resolvedPath);//resolvedPath {pathname: '/about', search: '?search1=1&search2=2', hash: ''}
```




### 路由传参
#### 向路由组件传递params参数
步骤：
1. 传递params参数，在路径后面用/进行拼接
2. 在路由表中定义接收路由参数
3. 对应组件使用 `useParams`hooks接收参数

```tsx
// 路由定义
const routers: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            // ...
            {
                path: 'useparams/:id/:name/:content',
                element: lazyLoad(<UseParams />),
            }
        ]
    },
]
// 路由跳转
<Link to={'/useparams/testID/testName/testContent'}>
   useparams
</Link>

// 组件中获取params
export default function Index() {
    const match = useMatch('/useparams/:id/:name/:content')
    const {id, name, content} = useParams()
    console.log(match); // 
    return (
        <div>
            <h4>id: {id}</h4>
            <h4>name: {name}</h4>
            <h4>content: {content}</h4>
        </div>
    )
}
```

#### 向路由组件传递search参数
步骤：
1. 在路由路径后用`?`分割
2. 对应组件使用 `useSearchParams` hooks接收参数

```jsx
// 路由跳转
<Link to={'/useparams/testID/testName/testContent?search1=testsearch&search2=testsearch2'}>
   useparams
</Link>

// 组件中获取search params
export default function Index() {
    const [search, setSearch] = useSearchParams();
    const location = useLocation();

    console.log(search.get('search1')); // testsearch
    console.log(search.get('search2')); // testsearch2

    console.log('location', location);
    return (
        <div>
            <button onClick={() => setSearch('search1=testsearch')}>set search1</button>
        </div>
    )
}
```

#### 向路由组件传递state参数
步骤：
1. 在Link组件中添加state参数
2. 对应组件使用 `useLocation()` hooks 接收参数

```jsx
// 路由跳转
<Link to={'/useparams/testID/testName/testContent' state={{state1: 'Test State'}}}>
   useparams
</Link>

// 组件中获取state参数
export default function Index() {
    const location = useLocation();

    const { state: {
        state1
    }} = location;

    console.log('location', location);
    return (
        <div>
            <h4>staet1: {state1}</h4>
        </div>
    )
}

```




### 常见问题
#### 使用路由懒加载切换路由时出现闪屏现象
- 原因：路由懒加载的组件在加载时，会先显示Suspense组件中的fallback组件，然后再显示路由组件，因此会出现闪屏现象，在切换路由是出现闪屏，是由于所有层级公用一个Suspense组件导致的。
- 解决方案：
  - 在每个路由组件中都使用Suspense组件包裹，这样每个路由组件都会有自己的Suspense组件，就不会出现闪屏现象了。
  - router配置，[具体配置](./test-react/src/router/index.js)
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
