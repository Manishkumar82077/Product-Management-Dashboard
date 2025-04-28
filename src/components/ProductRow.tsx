import React from "react";
import { Product } from "../types/Product";

interface ProductRowProps {
  product: Product;
}

const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
  // Check if stock is less than 10
  const stockClass = product.stock < 10 ? "text-red-500" : "text-black";

  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="py-2 px-4">
        <img src={product.thumbnail} alt={product.title} className="w-12 h-12 object-cover rounded" />
      </td>
      <td className="py-2 px-4 text-sky-950">{product.title}</td>
      <td className="py-2 px-4">{product.category}</td>
      <td className="py-2 px-4">${product.price}</td>
      <td className={`py-2 px-4 ${stockClass}`}>{product.stock}</td>
    </tr>
  );
};

export default ProductRow;
