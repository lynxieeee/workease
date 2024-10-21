import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="mx-auto max-w-2xl py-24">
      <div className="">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Work Simplification Assistant
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Designed to enhance productivity by simplifying daily work processes. <br/>
              WorkEase is ideal for scenarios requiring frequent form or text handling, such as business management, document editing, and report generation, helping users save time and reduce errors.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="/tools"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
            </div>
          </div>
    </div>
  );
};

export default Home;
