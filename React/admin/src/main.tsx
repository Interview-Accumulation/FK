import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import App from './App.tsx'
import { HelmetProvider } from 'react-helmet-async'
// tailwind css
import './theme/index.css';

import { worker } from './_mock';
// i18n
import './locales/i18n';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // 失败重试次数
      cacheTime: 5 * 60 * 1000, // 缓存时间
      staleTime: 10 * 1000,
      refetchOnWindowFocus: false, // 禁止窗口聚焦时重新获取数据
      refetchOnMount: false, // 禁止组件挂载时重新获取数据
      refetchOnReconnect: false, // 禁止重新连接时重新获取数据
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <App />
      </Suspense>
    </QueryClientProvider>
  </HelmetProvider>,
)


// 🥵 start service worker mock in development mode
worker.start({ onUnhandledRequest: 'bypass' });