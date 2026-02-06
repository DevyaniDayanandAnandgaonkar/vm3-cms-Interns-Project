import * as React from "react";

export function Button({ children, className = "", ...props }) {
  const base = "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition";
  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
