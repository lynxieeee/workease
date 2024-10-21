// src/pages/tools/dynamicFormPage/DynamicFormRoutes.tsx
import React from 'react';
import { Route } from 'react-router-dom';
import TransferForm2TextPage from '@/pages/tools/transferForm2Text/page';
import { PageConfig, DefaultFormSettings } from '@/config/transferForm2Text'
import ToolsPage from '@/pages/tools'
import TransferForm2TextIndex from '@/pages/tools/transferForm2Text'

const ToolRoutes = [
    <Route key="/tools" path="/tools"  element={<ToolsPage/>}/>,
    <Route key="/tools/transfer-form-to-text" path={`/tools/transfer-form-to-text`} element={<TransferForm2TextIndex />} />,
    PageConfig.map((config) => (
        <Route
            key={`/tools/transfer-form-to-text/${config.page}`}
            path={`/tools/transfer-form-to-text/${config.page}`}
            element={<TransferForm2TextPage formConfig={config} defaultFormSettings={DefaultFormSettings}/>}
        />
    ))
]

export default ToolRoutes;