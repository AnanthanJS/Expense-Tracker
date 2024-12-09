import React from 'react';
import ExpenseManager from '../ExpenseManager';
import { CustomNavbar } from '../Navbar/CustomNavbar';
import ProtectedRoute from '../ProtectedRoute';

const Home = () => (
  <>
    <CustomNavbar />
    <ProtectedRoute>
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseManager />
    </div>
    </ProtectedRoute>
  </>
);

export default Home;
