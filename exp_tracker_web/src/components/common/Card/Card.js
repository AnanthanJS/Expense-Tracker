import React from "react";

const Card = ({
  children,
  className = "",
  width = "w-full",
  height = "h-auto",
  padding = "p-4",
  shadow = "shadow-lg",
  borderRadius = "rounded-lg",
  background = "bg-background dark:bg-background-dark",
  textColor = "text-primary dark:text-primary-light",
  ...props
}) => {
  return (
    <div
      className={`${background} ${textColor} ${width} ${height} ${padding} ${shadow} ${borderRadius} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;