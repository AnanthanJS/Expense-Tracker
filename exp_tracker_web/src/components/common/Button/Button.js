import React from 'react';
import clsx from 'clsx'; // A utility for conditionally joining classNames

const Button = ({ variant = 'primary', children, className, ...props }) => {
  const baseClass = 'btn px-4 py-2 rounded shadow focus:outline-none transition-colors duration-300 ease-in-out';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark dark:bg-primary-dark dark:text-primary-light dark:hover:bg-primary-light',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark dark:bg-secondary-dark dark:hover:bg-secondary-light',
  };

  // Make the padding responsive using Tailwind's responsive classes
  const responsivePadding = 'px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4'; // Adjust padding for small, medium, and large screens

  // Merge default classes with custom ones
  const combinedClassNames = clsx(baseClass, variants[variant], responsivePadding, className);

  return (
    <button className={combinedClassNames} {...props}>
      {children}
    </button>
  );
};

export default Button;
