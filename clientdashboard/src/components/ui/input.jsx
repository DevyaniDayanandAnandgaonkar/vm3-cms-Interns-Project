import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-gray-400 selection:bg-red-600 selection:text-white bg-gray-800 border border-gray-700 h-9 w-full min-w-0 rounded-md px-3 py-1 text-sm shadow-sm transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-red-500 focus-visible:ring-red-500/30 focus-visible:ring-[3px]",
        "aria-invalid:ring-red-400 aria-invalid:border-red-500",
        className
      )}
      {...props} />
  );
}

export { Input }
