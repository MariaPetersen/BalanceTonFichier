import React from "react";

import "./Input.css";

export default function Input({ svgCode, placeholder, type, value, onChange }) {
  return (
    <div className="input-container">
      <div
        className="icon-container"
        dangerouslySetInnerHTML={{ __html: svgCode }}
      />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
}
