import React, { useState } from 'react';
import InputField from './common/InputField/InputField';
import Button from './common/Button/Button';
import Card from './common/Card/Card';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const categories = [
  'Food', 'Transport', 'Health', 'Fuel', 'Entertainment', 'Utilities', 'Other'
];

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
          borderRadius="rounded-lg"
          textColor="text-gray-900 dark:text-gray-100"
          themeOverride={true}
        >
          <div className="flex pl-6 justify-between items-center">
            <h1 className="text-4xl mb-2 font-semibold text-gray-700 dark:text-gray-300">
              New Expense
            </h1>
            <IconButton className='px-4' onClick={onCancel} color="primary">
              <CloseIcon />
            </IconButton>
          </div>
          <div className='flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6'>
            <Card width="w-full md:w-3/4 lg:w-2/3 mx-auto" themeOverride={true}>
              <form onSubmit={handleSubmit}>
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
                  <div className="w-full">
                    <select
                      name="category"
                      value={formValues.category}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-primary dark:focus:border-primary-dark sm:text-sm rounded-md bg-background dark:bg-background-dark text-text dark:text-text-dark placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 ease-in-out"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
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
            {/* <Card width="w-full sm:w-3/5 lg:w-1/3 mx-auto">
            <div className="flex items-center justify-center h-full">
              <Button
                variant="primary"
                className="flex items-center justify-center"
                onClick={handleButtonClick}
              >
                <CloudUploadIcon className="mr-2" />
                Upload Invoice
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                multiple
              />
            </div>
            </Card> */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseForm;
