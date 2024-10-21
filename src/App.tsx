import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layout'

import { initMessage } from '@/utils/notificationHelper';
import '@/utils/notificationHelper/index.scss'


import ToolsRoutes from '@/pages/tools/routes'
import HomePage from '@/pages/home'
import NotFoundPage from '@/pages/404'; // 导入 404 页面组件


const App: React.FC = () => {
    const contextHolder = initMessage()

  return (
        <Router>
            {contextHolder}
            <Layout>
                <Routes>
                    <Route path="/"  element={<HomePage/>}/>
                    {ToolsRoutes}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Layout>
        </Router>
   
  );
};

export default App;
