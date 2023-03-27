import React from "react";

export default function NavButton({ children, onClick }) {
  return (
    <button
      type="button"
      className="mt-4"
      onClick={onClick}
      style={{
        border: "1px solid transparent",
        padding: "8px",
        fontSize: "12em",
        height: "5vh",
        backgroundColor: "#f8f4f9"
      }}
    >
      {children}
    </button>
  );
}
