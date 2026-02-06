import * as React from "react";

export function Dialog({ open, onOpenChange, children, className = "" }) {
  if (!open) return null;
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 bg-black/50" onClick={() => onOpenChange?.(false)} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default Dialog;
