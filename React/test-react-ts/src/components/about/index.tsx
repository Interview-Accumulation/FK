import React from 'react'
import {
  useInRouterContext,
  useNavigationType,
  useResolvedPath
} from 'react-router-dom'

export default function Index() {
  console.log('是否处于路由的上下文环境？', useInRouterContext());
  console.log(useNavigationType());

  const resolvedPath = useResolvedPath('/about?search1=1&search2=2');
  console.log('resolvedPath', resolvedPath);//resolvedPath {pathname: '/about', search: '?search1=1&search2=2', hash: ''}
  return (
    <div>About</div>
  )
}
