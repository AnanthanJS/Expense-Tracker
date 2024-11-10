import React, { useState, useEffect } from 'react';
import { getExpenses, addExpense } from '../services/expenseServices';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    }
    fetchData();
  }, []);

  const handleAddExpense = async (expense) => {
    try {
      const newExpense = await addExpense(expense);
      setExpenses([...expenses, newExpense]); // Add the new expense to the current list
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className='col-md-12'>
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default ExpenseManager;
