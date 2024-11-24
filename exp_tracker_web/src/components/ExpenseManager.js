import React, { useState, useEffect } from 'react';
import { getExpenses, addExpense } from '../services/expenseServices';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
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

  return (
    <div className='col-md-12'>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default ExpenseManager;
