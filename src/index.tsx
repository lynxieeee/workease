import ReactDOM from 'react-dom/client';
import App from './App';
import './tailwind.css'; // 引入 Tailwind CSS
import 'antd/dist/reset.css';
import type { ThemeConfig } from 'antd';
import { ConfigProvider } from 'antd';

const config: ThemeConfig = {
  token: {
    colorPrimary: '#4f46e5',
  },
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <ConfigProvider theme={config}>
    <App />
  </ConfigProvider>,
);
