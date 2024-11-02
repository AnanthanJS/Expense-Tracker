import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/expenses/';

export const getExpenses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addExpense = async (expense) => {
  try {
    const response = await axios.post(API_URL, {
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    }, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('Expense added:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Server responded with:', error.response.data); // Log specific error
    } else {
      console.error('Error adding expense:', error.message);
    }
    throw error;
  }
};
  
