import React from 'react';

const Home: React.FC = () => {
  return (
    <main className="grid min-h-full px-6 py-20 sm:py-20 lg:px-8">
        <div className="">
            <p className="text-base font-semibold text-indigo-600">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="mt-10 flex items-center gap-x-6">
                <a href="/" className="py-2.5 text-sm font-semibold text-indigo-600">
                    <span aria-hidden="true">←</span> Back to home
                </a>
            </div>
        </div>
    </main>
  );
};

export default Home;
