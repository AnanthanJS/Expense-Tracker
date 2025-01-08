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
  themeOverride = false,
  ...props
}) => {

  const cardClass = themeOverride
    ? '' // Remove all theme-related classes if themeOverride is true
    : `${background} ${textColor} ${shadow}`;

  return (
    <div
      className={` ${cardClass} ${width} ${height} ${padding} ${borderRadius} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;