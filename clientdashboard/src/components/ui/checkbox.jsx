"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer w-5 h-5 flex items-center justify-center rounded-md border border-gray-700 bg-gray-800 text-gray-100 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 focus-visible:ring-2 focus-visible:ring-red-500/40 outline-none transition",
        className
      )}
      {...props}>
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-white">
        <CheckIcon className="w-4 h-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox }
