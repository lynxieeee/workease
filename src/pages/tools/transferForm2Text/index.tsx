import React from 'react';
import { PageConfig } from '@/config/transferForm2Text'
import { Link, useLocation } from 'react-router-dom';
import {TOOLS} from '@/config/tools'

const DynamicFormIndex: React.FC = () => {
  const location = useLocation();
  const toolName =
    (location.pathname.split('/')?.at(-1) as keyof typeof TOOLS) || '';

  const currentToolSettings = TOOLS[toolName];


  return (
    <div className="mx-auto max-w-3xl ">
      <Link
        className="mb-2 text-sm leading-6 font-semibold text-sky-500 dark:text-sky-400"
        to="/tools"
      >
        Tools
      </Link>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">{currentToolSettings.title}</h1>
      <h1 className="mb-4 mt-4 max-w-4xl text-base leading-7 text-slate-700">{currentToolSettings.desc}</h1>
      <ul role="list" className="divide-y divide-gray-100 my-16">
        {PageConfig.map((config) => (
          <li className="flex justify-between gap-x-6 py-5" key={config.page}>
            <div className="flex min-w-0 gap-x-4">
              {config.imageUrl ? (
                <img
                  alt=""
                  src={config.imageUrl}
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                />
              ) : null}
              <div className="min-w-0 flex-auto">
                <Link to={config.page}> 
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {config.title}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {config.desc}
                  </p>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DynamicFormIndex;
