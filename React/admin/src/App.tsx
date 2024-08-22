import { App as AntdApp } from 'antd'
import { Helmet } from 'react-helmet-async'
import Router from '@/router'
import Logo from '@/assets/images/react.svg'
import { MotionLazy } from './components/animate/motion-lazy'
import AntdConfig from '@/theme/antd';

function App() {

  return (
    <AntdConfig>
      <AntdApp>
        <MotionLazy>
          <Helmet>
            <title>K Admin</title>
            <meta name="description" content="K Admin" />
            <link rel="icon" href={Logo} />
          </Helmet>
          <Router />
        </MotionLazy>
      </AntdApp>
    </AntdConfig>
  )
}

export default App
