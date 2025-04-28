import React from "react";

interface SortOptionsProps {
  onSort: (criteria: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ onSort }) => {
  return (
    <div className="flex gap-4 mb-6">
      <button onClick={() => onSort("price")} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">
        Sort by Price
      </button>
      <button onClick={() => onSort("stock")} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">
        Sort by Stock
      </button>
      <button onClick={() => onSort("title")} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">
        Sort by Title
      </button>
    </div>
  );
};

export default SortOptions;
