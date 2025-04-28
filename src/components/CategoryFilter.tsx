import React from "react";

interface CategoryFilterProps {
  categories: string[];
  onFilter: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, onFilter }) => {
  return (
    <div className="w-full md:w-auto">
      <select
        onChange={(e) => onFilter(e.target.value)}
        className="w-full md:w-56 py-2  rounded-xl bg-white border-2 border-pink-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300 shadow-sm"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
