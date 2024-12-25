import React from 'react';
import { Outlet } from 'react-router-dom';
import { CustomNavbar } from '../Navbar/CustomNavbar';
import Card from '../common/Card/Card';

const Home = () => {
  return (
    <div className="home-container flex h-screen">
      {/* Left-Side Navigation */}
      <div className="left-nav w-1/4 bg-gray-100 dark:bg-gray-800 p-4">
        <CustomNavbar />
      </div>

      {/* Right-Side Dynamic Content */}
      <div className="right-content w-3/4 p-6 overflow-y-auto">
        <Card
          width="w-full"
          height="h-full"
          padding="p-6"
          shadow="shadow-lg"
          borderRadius="rounded-lg"
          background="bg-gray dark:bg-gray-900"
          textColor="text-gray-800 dark:text-gray-300"
        >
          {/* Renders the component matching the current route */}
          <Outlet />
        </Card>
      </div>
    </div>
  );
};

export default Home;
