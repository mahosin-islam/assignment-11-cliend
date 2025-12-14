import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div>
             <Navbar />
      <div className='mt-2 min-h-[calc(100vh-68px)] '>
        <Outlet />
      </div>
      <Footer />
        </div>
    );
};

export default MainLayout;