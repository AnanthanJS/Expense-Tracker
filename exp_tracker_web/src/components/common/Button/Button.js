import React from 'react';

const Button = ({ variant = 'primary', children, ...props }) => {
  const baseClass = 'btn px-4 py-2 rounded shadow focus:outline-none transition-colors duration-300 ease-in-out';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark dark:bg-primary-dark dark:text-primary-light dark:hover:bg-primary-light',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark dark:bg-secondary-dark dark:hover:bg-secondary-light',
  };

  return (
    <button className={`${baseClass} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
