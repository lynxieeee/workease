import React from 'react';
import './index.scss'
const Header: React.FC = () => {
  return (
    <nav aria-label="Global" className="relative mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center py-[2.125rem]">
            <div className="absolute inset-x-0 bottom-0 h-px bg-slate-900/5"></div>
            <div className='text-balance text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-4xl lg:text-3xl'>
                <a className="flex-none text-slate-900" href="/">
                    Work Ease
                </a>
            </div>
            {/* <div className="ml-auto hidden lg:flex lg:items-center"> */}
            <div className="ml-auto lg:flex lg:items-center">
                <a className="ml-8" href='/'>Home</a>
                <a className="ml-8" href='tools'>Tools</a>
            </div>
            {/* <button type="button" className="-my-1 ml-auto flex h-8 w-8 items-center justify-center rounded-lg lg:ml-8">
                <span className="sr-only">Search components</span>
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-gray-900 hover:fill-gray-900">
                    <path d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z"></path>
                </svg>
            </button>
            <button type="button" className="-my-1 -mr-1 ml-6 flex h-8 w-8 items-center justify-center lg:hidden">
                <span className="sr-only">Open navigation</span>
                <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-slate-900">
                    <path d="M3.75 12h16.5M3.75 6.75h16.5M3.75 17.25h16.5" fill="none" stroke-width="1.5" stroke-linecap="round"></path>
                </svg>
            </button> */}
        </div>
    </nav>
  );
};

export default Header;
