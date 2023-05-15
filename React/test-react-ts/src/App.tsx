import './App.css'
import { ConfigProvider, Spin } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routers from './router';
import { Suspense } from 'react';

function App() {
  const Element = () => useRoutes(routers);
  return (
    <>
    <ConfigProvider locale={zhCN}>
      <Suspense fallback={<Spin/>}>
        <Router>
            <Element />
        </Router>
      </Suspense>
    </ConfigProvider>
    </>
  )
}

export default App
