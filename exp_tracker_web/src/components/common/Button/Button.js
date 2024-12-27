import React from 'react';
import clsx from 'clsx'; // A utility for conditionally joining classNames

const Button = ({ variant = 'primary', children, className, ...props }) => {
  const baseClass = 'btn px-4 py-2 rounded shadow focus:outline-none transition-colors duration-300 ease-in-out';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark dark:bg-primary-dark dark:text-primary-light dark:hover:bg-primary-light',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark dark:bg-secondary-dark dark:hover:bg-secondary-light',
  };

  // Merge default classes with custom ones
  const combinedClassNames = clsx(baseClass, variants[variant], className);

  return (
    <button className={combinedClassNames} {...props}>
      {children}
    </button>
  );
};

export default Button;
