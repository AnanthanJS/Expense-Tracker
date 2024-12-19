import React, { useState } from 'react';
import InputField from './common/InputField/InputField';
import Button from './common/Button/Button';

const ExpenseForm = ({ onAddExpense }) => {
  const [formValues, setFormValues] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAddExpense(formValues);
    setFormValues({ title: '', amount: '', category: '', date: '' });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-background dark:bg-background-dark p-6 rounded-lg shadow-lg">
          <div className="space-y-6">
            <InputField
              type="text"
              placeholder="Title"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              required
              className="w-full"
            />
            <InputField
              type="number"
              placeholder="Amount"
              name="amount"
              value={formValues.amount}
              onChange={handleChange}
              required
              className="w-full"
            />
            <InputField
              type="text"
              placeholder="Category"
              name="category"
              value={formValues.category}
              onChange={handleChange}
              required
              className="w-full"
            />
            <InputField
              type="date"
              name="date"
              value={formValues.date}
              onChange={handleChange}
              required
              className="w-full"
            />
            <div className="flex justify-center mt-4">
              <Button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-200">
                Add Expense
              </Button>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
