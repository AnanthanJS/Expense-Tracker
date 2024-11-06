import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) => {
  return (
    <div className='row d-flex justify-content-center mt-5'>
      <div className='col-auto'>
        <button
          className='btn btn-primary'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page(s) {currentPage} of {totalPages} </span>
        <button
          className='btn btn-primary'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="col-auto">
        <select 
          value={itemsPerPage} 
          onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))} 
          className="form-select"
        >
          {[5, 10, 15, 20, 25].map((num) => (
            <option key={num} value={num}>{num} Items</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
