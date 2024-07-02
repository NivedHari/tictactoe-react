import React from "react";

export default function Cell({ value, onClick, className,isDark }) {
  return (
    <div className={`board_cell ${className} ${isDark ? 'bg-slate-800' : 'bg-white'}`} onClick={onClick}>
      {value}
    </div>
  );
}
