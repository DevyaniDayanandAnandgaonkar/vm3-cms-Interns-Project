import * as React from "react";

export function Textarea(props) {
  return <textarea {...props} className={`rounded-md border px-3 py-2 ${props.className || ''}`} />;
}

export default Textarea;
