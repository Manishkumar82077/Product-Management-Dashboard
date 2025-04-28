import React, { useState } from "react";
import { Product } from "../types/Product";

interface ProductFormModalProps {
  onAddProduct: (product: Product) => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ onAddProduct }) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    title: "",
    price: 0,
    category: "",
    stock: 0,
    thumbnail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newProduct: Product = {
      id: Date.now(),
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };
    onAddProduct(newProduct);
    setFormData({ title: "", price: 0, category: "", stock: 0, thumbnail: "" });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      <div className="flex flex-col gap-3">
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="border p-2 rounded" />
        <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2 rounded" />
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border p-2 rounded" />
        <input name="stock" type="number" placeholder="Stock" value={formData.stock} onChange={handleChange} className="border p-2 rounded" />
        <input name="thumbnail" placeholder="Image URL" value={formData.thumbnail} onChange={handleChange} className="border p-2 rounded" />
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductFormModal;
