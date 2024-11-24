import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/expenses/';

// Function to get expenses for the logged-in user
export const getExpenses = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }

    const response = await axios.get(API_URL, {
      headers: { 'Authorization': `Token ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error.message);
    throw error;
  }
};

// Function to add a new expense
export const addExpense = async (expense) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }

    console.log('Expense to be added:', expense);

    const response = await axios.post(
      API_URL,
      {
        title: expense.title,
        amount: parseFloat(expense.amount),
        category: expense.category,
        date: expense.date,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      }
    );
    console.log('Expense added:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Server responded with:', error.response.data); // Log specific error from server
    } else {
      console.error('Error adding expense:', error.message); // Network or other error
    }
    throw error;
  }
};
