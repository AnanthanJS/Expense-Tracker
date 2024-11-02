import React from 'react';
import ExpenseManager from '../components/ExpenseManager';
import { Navbar } from '../components/Navbar/Navbar';

const Home = () => (
  <>
    <Navbar />
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseManager />
    </div>
  </>
);

export default Home;
