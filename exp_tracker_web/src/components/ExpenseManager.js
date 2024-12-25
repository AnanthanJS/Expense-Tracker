import React, { useState, useEffect } from 'react';
import { getExpenses, addExpense } from '../components/services/expenseServices';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track if user is logged in

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token'); // Check if user is logged in (has token)
      
      if (!token) {
        setIsLoggedIn(false);
        return; // If no token, stop fetching expenses and show login message
      }

      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (error) {
        setErrorMessage('Error fetching expenses. Please try again later.');
        console.error('Error fetching expenses:', error);
      }
    }

    fetchData();
  }, []); // Empty array means this runs only once on mount

  const handleAddExpense = async (expense) => {
    try {
      const newExpense = await addExpense(expense);
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]); // Ensure to use the latest state
    } catch (error) {
      setErrorMessage('Error adding expense. Please try again.');
      console.error('Error adding expense:', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="alert alert-warning">
        Please log in to access your expenses.
      </div>
    );
  }

  return (
    <div className='col-md-12'>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default ExpenseManager;
