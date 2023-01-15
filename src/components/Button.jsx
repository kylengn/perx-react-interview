import React from "react";

const Button = ({ name, onClick }) => {
  return (
    <div className="flex self-center justify-end items-center w-1/2 h-12 max-w-2xl">
      <button
        className="px-8 py-2 border-2 border-emerald-500 hover:text-white hover:bg-emerald-500 transition-all duration-200 rounded-full font-bold ease-in-out"
        onClick={onClick}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
