import React, { useState } from 'react';
import InputField from './common/InputField/InputField';
import Button from './common/Button/Button';
import Card from './common/Card/Card';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ExpenseForm = ({ onAddExpense, onCancel }) => {
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
    <div className="container">
      <div className="row">
        <Card
          width="w-full md:w-3/4 mx-auto"
          padding="p-6"
          shadow="shadow-md"
          borderRadius="rounded-lg"
          textColor="text-gray-900 dark:text-gray-100"
        >
          <div className="flex pl-6 justify-between items-center">
            <h1 className="text-4xl mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Add Expense
            </h1>
            <IconButton className='px-4' onClick={onCancel} color="primary">
              <CloseIcon />
            </IconButton>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
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
        </Card>
      </div>
    </div>
  );
};

export default ExpenseForm;
