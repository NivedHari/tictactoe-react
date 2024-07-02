import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaExclamationCircle } from "react-icons/fa";
import { BiHappyAlt } from "react-icons/bi";

export default function Modal({
  isDark,
  isVisible,
  onClose,
  isDraw,
  isOver,
  isXNext,
}) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex flex-col justify-center items-center transition-all duration-300 select-none">
      <div>
        {isDraw && !isOver && (
          <div className="w-80 md:w-[500px] h-48 bg-violet-700 flex justify-center items-center rounded-lg">
            <div className="flex justify-center items-center flex-col text-white gap-3">
              <FaExclamationCircle className="text-4xl" />
              <h1 className="text-3xl font-bold">Draw !</h1>
            </div>
          </div>
        )}
        {isOver && (
          <div className={`w-80 md:w-[500px] h-48 ${isXNext ? 'bg-blue-500':'bg-red-500'} flex justify-center items-center rounded-lg`}>
            <div className="flex justify-center items-center flex-col text-white gap-3">
              <BiHappyAlt className="text-4xl" />
              <h1 className="text-3xl font-bold">
                {isXNext ? "Blue Win !" : "Red Win !"}
              </h1>
            </div>
          </div>
        )}
      </div>
      <button
        className={`mt-6 ${
          isDark ? "bg-slate-500 text-slate-100" : "bg-slate-200 text-slate-800"
        } text-2xl h-12 w-12 rounded-full flex justify-center items-center hover:shadow-lg`}
        onClick={() => onClose()}
      >
        <IoCloseSharp />
      </button>
    </div>
  );
}
