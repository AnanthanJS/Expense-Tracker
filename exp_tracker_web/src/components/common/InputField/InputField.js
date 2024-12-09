import React from 'react';

const InputField = ({ type, placeholder, value, onChange, name, required }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="form-control px-4 py-2 rounded-md bg-background dark:bg-background-dark
       text-text dark:text-text-dark placeholder-gray-500 dark:placeholder-gray-400 
        border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2
        focus:ring-primary dark:focus:ring-primary-dark focus:ring-offset-2 
        hover:border-primary dark:hover:border-primary dark:focus:ring-offset-2 
        transition-all duration-200 ease-in-out focus:bg-background dark:focus:bg-background-dark 
        caret-primary dark:caret-primary-dark"
    />
  );
};

export default InputField;
