import React, { ReactNode } from 'react';
import Header from './Header';
import './index.scss';
import bgImg from '@/assets/beams-basic.png';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="min-h-screen relative -mt-[7rem] overflow-hidden pt-[7rem]">
        <img
          src={bgImg}
          alt=""
          className="bg-image absolute left-1/2 top-0 -ml-[39rem] w-[113.125rem] max-w-none"
        />
        <div className="page-wrapper p-10 relative">{children}</div>
      </div>
    </>
  );
};

export default Layout;
