import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpense = { title, amount, category, date };
    await onAddExpense(newExpense); // Call the parent component's function
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
  };

  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-3'>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 d-flex flex-column gap-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <input
                  className="form-control"
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                <input
                  className="form-control"
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
                <input
                  className="form-control"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <div className='d-flex justify-content-center mt-1'>
                  <button className='btn btn-primary w-100' type="submit">Add Expense</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseForm;
