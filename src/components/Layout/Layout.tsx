import React, { PropsWithChildren } from 'react';
import Navbar from '../Navbar/Navbar';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className="bg-success-subtle mb-2">
        <Navbar />
      </header>
      <main className="container">{children}</main>
    </>
  );
};

export default Layout;
