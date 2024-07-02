import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Board from "./Board";
import Modal from "../Layout/Modal";

export default function Game() {
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null)));
  const [isXNext, setIsXNext] = useState(true);
  const [isDraw, setIsDraw] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scores, setScores] = useState({ red: 0, blue: 0 });

  useEffect(() => {
    const checkDraw = () => {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === null) {
            return;
          }
        }
      }
      setIsDraw(true);
      setShowModal(true);
    };

    const checkWin = () => {
      if (
        (board[0][0] &&
          board[0][0] === board[0][1] &&
          board[0][1] === board[0][2]) ||
        (board[1][0] &&
          board[1][0] === board[1][1] &&
          board[1][1] === board[1][2]) ||
        (board[2][0] &&
          board[2][0] === board[2][1] &&
          board[2][1] === board[2][2]) ||
        (board[0][0] &&
          board[0][0] === board[1][1] &&
          board[1][1] === board[2][2]) ||
        (board[2][0] &&
          board[2][0] === board[1][1] &&
          board[1][1] === board[0][2]) ||
        (board[0][1] &&
          board[0][1] === board[1][1] &&
          board[1][1] === board[2][1]) ||
        (board[0][2] &&
          board[0][2] === board[1][2] &&
          board[1][2] === board[2][2]) ||
        (board[0][0] &&
          board[0][0] === board[1][0] &&
          board[1][0] === board[2][0])
      ) {
        setIsOver(true);
        setShowModal(true);
        if (isXNext) {
          setScores((prevScores) => ({
            ...prevScores,
            blue: prevScores.blue + 1,
          }));
        } else {
          setScores((prevScores) => ({
            ...prevScores,
            red: prevScores.red + 1,
          }));
        }
      }
    };

    checkDraw();
    checkWin();
  }, [board, isXNext]);

  const handleClick = (row, col) => {
    if (board[row][col]) return;
    const newBoard = board.map((r, i) =>
      r.map((cell, j) =>
        i === row && j === col ? (isXNext ? "X" : "O") : cell
      )
    );
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleDark = () => {
    setIsDark((prev) => !prev);
  };

  const handleReset = () => {
    setBoard(Array(3).fill(Array(3).fill(null)));
    setIsOver(false);
    setIsDraw(false);
  };

  const handleClose = () => {
    setShowModal(false);
    handleReset();
  };

  const handleResetScore = () => {
    setScores({ red: 0, blue: 0 });
  };
  return (
    <div
      className={`h-screen flex items-center flex-col justify-center relative ${
        isDark ? "bg-slate-700" : "bg-slate-300"
      } transition-colors duration-300`}
    >
      <div className="absolute top-10">
        <h1
          className={` text-5xl font-bold select-none ${
            isDark ? "text-slate-300" : "text-slate-700"
          }`}
        >
          Tic-Tac-Toe
        </h1>
      </div>
      <button
        onClick={handleDark}
        className={`absolute top-5 right-5 md:top-[3.7rem] md:right-80 text-2xl ${
          isDark ? "text-slate-300" : "text-slate-700"
        }`}
      >
        {isDark ? <FaSun /> : <FaMoon />}
      </button>
      <div className="mx-auto relative py-3 mt-20 md:mt-0">
        <div className="mb-20">
          <div
            className={`w-[9rem] h-20 bg-red-600 rounded-lg absolute top-0 z-1 select-none left-3 ${
              !isXNext ? "bg-transparent" : "text-white"
            } transition-all duration-500 ease-in-out text-center flex justify-center items-center text-3xl font-bold ${
              !isDark ? "text-slate-900" : "text-slate-200"
            }`}
          >
            {scores.red}
          </div>
          <div
            className={`w-[9rem] h-20 bg-blue-600 right-3 rounded-lg absolute top-0 z-1 select-none ${
              !isXNext ? "text-white" : "bg-transparent"
            } transition-all duration-500 ease-in-out flex justify-center items-center text-3xl font-bold ${
              !isDark ? "text-slate-900" : "text-slate-200"
            }`}
          >
            {scores.blue}
          </div>
        </div>
        <Board board={board} handleClick={handleClick} isDark={isDark} />
        <div className="mt-4 flex justify-center gap-6">
          <button
            className={`${
              !isDark
                ? "bg-slate-700 text-slate-200"
                : "bg-slate-400 text-slate-900"
            } transition-colors duration-300 py-1 px-2 rounded-md select-none`}
            onClick={handleReset}
          >
            Reset Board
          </button>
          <button
            className={`${
              !isDark
                ? "bg-slate-700 text-slate-200"
                : "bg-slate-400 text-slate-900"
            } transition-colors duration-300 py-1 px-2 rounded-md select-none`}
            onClick={handleResetScore}
          >
            Reset Scores
          </button>
        </div>
      </div>
      <Modal
        isDark={isDark}
        isVisible={showModal}
        onClose={handleClose}
        isDraw={isDraw}
        isOver={isOver}
        isXNext={isXNext}
      />
    </div>
  );
}
