import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import jaJP from 'antd/lib/locale/ja_JP';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import ErrorBoundary from './components/common/error-boundary';
import { GlobalProvider } from './global/provider';
import './index.css';
import PageRoutes from './router';
import { baseTheme } from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <React.Suspense fallback={<div>加载中……</div>}>
        <HashRouter>
          <ConfigProvider locale={jaJP} theme={{ token: baseTheme }}>
            <StyleProvider hashPriority="high">
              <GlobalProvider>
                <PageRoutes />
              </GlobalProvider>
            </StyleProvider>
          </ConfigProvider>
        </HashRouter>
      </React.Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
);
