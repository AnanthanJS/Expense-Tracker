import React from 'react';
import Button from '../common/Button/Button';

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) => {
  return (
    <div className='row d-flex justify-content-center mt-5'>
      <div className='col-auto'>
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="primary"
        >
          Previous
        </Button>
        <span className="mx-2 text-primary dark:text-primary-light">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="primary"
        >
          Next
        </Button>
      </div>
      <div className="col-auto">
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
          className="form-select text-primary dark:text-primary-light bg-background dark:bg-background-dark border-gray-300 dark:border-gray-600 focus:ring-primary dark:focus:ring-primary-dark"
        >
          {[5, 10, 15, 20, 25].map((num) => (
            <option key={num} value={num}>
              {num} Items
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
