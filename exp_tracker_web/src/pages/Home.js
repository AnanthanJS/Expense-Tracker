import React from 'react';
import ExpenseManager from '../components/ExpenseManager';
import { Navbar } from '../components/Navbar/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';

const Home = () => (
  <>
    <Navbar />
    <ProtectedRoute>
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseManager />
    </div>
    </ProtectedRoute>
  </>
);

export default Home;
