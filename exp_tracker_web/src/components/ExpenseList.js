import React, { useState, useEffect } from 'react';
import Pagination from './Pagination/Pagination';
import InputField from './common/InputField/InputField';
import Card from './common/Card/Card';

const ExpenseList = ({ expenses }) => {
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [filterText, setFilterText] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // const itemsPerPage = 5; // Change this number to show more or fewer items per page

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
        <Card
          width="w-full md:w-3/4 mx-auto"
          padding="p-6"
          shadow="shadow-md"
          borderRadius="rounded-lg"
          textColor="text-gray-900 dark:text-gray-100"
        >
          {/* Filtering and Sorting Section */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Heading */}
              <h3 className="text-xl font-bold md:mb-0 text-primary dark:text-primary-light">
                Expenses Table
              </h3>

              {/* Filter and Sort Options */}
              <div className="flex flex-col md:flex-row gap-4 items-center md:ml-auto">
                {/* Filter Input */}
                <div className="w-full md:w-48">
                  <label htmlFor="filterInput" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Filter:
                  </label>
                  <InputField 
                    id="filterInput"
                    type="text"
                    placeholder="Filter by title or category"
                    value={filterText}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  />
                </div>

                {/* Sorting Options */}
                <div className="w-full md:w-48">
                  <label htmlFor="sortOptions" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sort By:
                  </label>
                  <select
                    id="sortOptions"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    onChange={(e) => {
                      const [key, direction] = e.target.value.split('-');
                      handleSort(key, direction);
                    }}
                  >
                    <option value="select">Select...</option>
                    <option value="title-ascending">A-Z</option>
                    <option value="title-descending">Z-A</option>
                    <option value="amount-ascending">Low to High</option>
                    <option value="amount-descending">High to Low</option>
                    <option value="date-ascending">Most Recent</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentExpenses.map((expense, index) => (
                <tr
                  key={expense.id}
                  className={`${
                    "bg-gray-50 dark:bg-gray-900"
                  }`}
                >
                  <td className="px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-4 py-2">{expense.title}</td>
                  <td className="px-4 py-2">${expense.amount}</td>
                  <td className="px-4 py-2">{expense.category}</td>
                  <td className="px-4 py-2">{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        {/* Pagination component */}
        <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1); // Reset to page 1 on itemsPerPage change
        }}
        />
      </div>
    </div>
  );
};

export default ExpenseList;
