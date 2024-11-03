import React, { useState, useEffect } from 'react';

const ExpenseList = ({ expenses }) => {
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [filterText, setFilterText] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Change this number to show more or fewer items per page

  // Filter expenses by title or category based on filter text
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Sort expenses based on the selected key and direction
  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Apply filtering and sorting whenever expenses, filterText, or sortConfig changes
  useEffect(() => {
    let updatedExpenses = expenses;

    // Filter expenses
    if (filterText) {
      updatedExpenses = updatedExpenses.filter((expense) =>
        expense.title.toLowerCase().includes(filterText.toLowerCase()) ||
        expense.category.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    // Sort expenses
    if (sortConfig.key) {
      updatedExpenses = [...updatedExpenses].sort((a, b) => {
        if (sortConfig.key === 'amount') {
          return sortConfig.direction === 'ascending'
            ? a.amount - b.amount
            : b.amount - a.amount;
        } else if (sortConfig.key === 'date') {
          return sortConfig.direction === 'ascending'
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
        } else {
          const comparison = a[sortConfig.key].localeCompare(b[sortConfig.key]);
          return sortConfig.direction === 'ascending' ? comparison : -comparison;
        }
      });
    }

    setFilteredExpenses(updatedExpenses);
  }, [expenses, filterText, sortConfig]);

  // Calculate pagination details
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const currentExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='container'>
      <div className='row'>
        <div 
        className='col-9'
        >
          <h2>Expenses</h2>
        </div>
        <div className='col-3'>
          {/* Filter Input */}
          <input
            className="form-control"
            type="text"
            placeholder="Filter by title or category"
            value={filterText}
            onChange={handleFilterChange}
            style={{ marginBottom: '10px', padding: '5px' }}
          />

          {/* Sorting Options */}
          <div style={{ marginBottom: '10px' }}>
            <label>Sort By: </label>
            <select className="form-select"
              onChange={(e) => {
                const [key, direction] = e.target.value.split('-');
                handleSort(key, direction);
              }}
            >
              <option selected value="">Select...</option>
              <option value="title-ascending">A-Z</option>
              <option value="title-descending">Z-A</option>
              <option value="amount-ascending">Low to High</option>
              <option value="amount-descending">High to Low</option>
              <option value="date-ascending">Earliest</option>
              <option value="date-descending">Latest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentExpenses.map((expense, index) => (
            <tr key={expense.id}>
              <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
              <td>{expense.title}</td>
              <td>${expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div>
        <button
          className='btn btn-primary'
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button
          className='btn btn-primary'
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExpenseList;
