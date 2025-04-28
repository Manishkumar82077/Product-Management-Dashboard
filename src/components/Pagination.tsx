import React from "react";

interface PaginationProps {
  totalProducts: number;
  productsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalProducts,
  productsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex space-x-2">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`px-4 py-2 rounded-full text-white font-semibold ${
            number === currentPage ? "bg-pink-500" : "bg-gray-400 hover:bg-pink-400"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
