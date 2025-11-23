import React from "react";
function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  disabled=false,
  isUpdateMode = false,
  ...props
}) 

{
    const dynamicBg = disabled && !isUpdateMode
    ? "bg-gray-400 cursor-not-allowed"
    : isUpdateMode
    ? "bg-green-500"
    : bgColor;
  return (
    <button
      type={type}
      disabled={disabled && !isUpdateMode}
      className={`px-4 py-2 rounded-lg ${dynamicBg} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;