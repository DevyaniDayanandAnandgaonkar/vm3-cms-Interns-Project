import * as React from "react";

export function Input(props) {
  return <input {...props} className={`rounded-md border px-3 py-2 ${props.className || ''}`} />;
}

export default Input;
