import React from "react";
import Cell from "./Cell";

export default function Board({ board, handleClick,isDark }) {
  return (
    <div className="flex gap-1 w-80 flex-wrap justify-center">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const cellClass = cell === "X" ? "cell-x" : cell === "O" ? "cell-o" : "";
          return (
            <Cell
              key={`${rowIndex}${colIndex}`}
              value={cell}
              onClick={() => handleClick(rowIndex, colIndex)}
              isDark={isDark}
              className={cellClass}
            />
          );
        })
      )}
    </div>
  );
}
