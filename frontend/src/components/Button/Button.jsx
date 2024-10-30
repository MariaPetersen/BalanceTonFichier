import React from "react";

import "./Button.css";

export default function Button({
  label,
  onClick,
  disabled = false,
  loading = false,
}) {
  return (
    <button
      className={`custom-button ${loading ? "loading" : ""}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="loading-dots">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </span>
      ) : (
        label
      )}
    </button>
  );
}
