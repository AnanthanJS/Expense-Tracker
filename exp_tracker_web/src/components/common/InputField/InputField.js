import React from 'react';

const InputField = ({
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  name = "",
  required = false,
  className = "",
  padding = "px-4 py-2",
  border = "border border-gray-300 dark:border-gray-600",
  borderRadius = "rounded-md",
  background = "bg-background dark:bg-background-dark",
  textColor = "text-text dark:text-text-dark",
  placeholderColor = "placeholder-gray-500 dark:placeholder-gray-400",
  focus = "focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:ring-offset-2 dark:focus:ring-offset-2",
  hover = "hover:border-primary dark:hover:border-primary",
  caretColor = "caret-primary dark:caret-primary-dark",
  transition = "transition-all duration-200 ease-in-out",
  ...props
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`${padding} ${border} ${borderRadius} ${background} ${textColor} ${placeholderColor} ${focus} ${hover} ${caretColor} ${transition} ${className}`}
      {...props}
    />
  );
};

export default InputField;
