import * as React from "react";

export function Select({ children, className = "", ...props }) {
  return (
    <select className={`rounded-md border px-3 py-2 ${className}`} {...props}>
      {children}
    </select>
  );
}

export default Select;
