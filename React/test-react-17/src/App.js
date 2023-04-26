import { ConfigProvider } from 'antd';
import './App.css';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Layout from './components/layout';
import routers from './router';
import { Suspense } from 'react';


function App() {
  const Element = () => useRoutes(routers);
  return (
    <ConfigProvider locale={zhCN}>
      <Suspense fallback={'...'}>
        <Router>
            <Element />
            {/* <Layout /> */}
        </Router>
      </Suspense>
      
    </ConfigProvider>
  );
}

export default App;
