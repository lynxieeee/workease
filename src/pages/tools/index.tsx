import React from 'react';
import { Link } from 'react-router-dom'
import {TOOLS} from '@/config/tools'

const ToolsPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl ">

    <h1 className="text-3xl font-bold mb-10">Tools</h1>
    
    <ul role="list" className="divide-y divide-gray-100">
      {
        Object.entries(TOOLS).map( ([link, tool]) => <li className="flex justify-between gap-x-6 py-5" key={link}>
          <div className="flex min-w-0 gap-x-4">
            {
              tool.imageUrl ? <img alt="" src={tool.imageUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50" /> : null
            }
            <div className="min-w-0 flex-auto">
              <Link to={link}>
                <p className="text-sm font-semibold leading-6 text-gray-900">{tool.title}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{tool.desc}</p>
              </Link>
            </div>
          </div>
        </li>)
      }
    </ul>
    </div>
  );
};

export default ToolsPage;
