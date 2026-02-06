import * as React from "react";

export function Badge({ variant = "default", className = "", ...props }) {
  const base = "inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium";
  const variants = {
    default: "bg-green-100 text-green-800",
    destructive: "bg-red-100 text-red-800",
    secondary: "bg-yellow-100 text-yellow-800",
    outline: "border bg-transparent text-gray-200",
  };
  const cls = `${base} ${variants[variant]} ${className}`.trim();
  return <span className={cls} {...props} />;
}

export default Badge;
