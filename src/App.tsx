import React, { useEffect, useState } from "react";
import { fetchProducts } from "./services/productService";
import { Product } from "./types/Product";
import ProductTable from "./components/ProductTable";
import ProductFormModal from "./components/ProductFormModal";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import SortOptions from "./components/SortOptions";
import Pagination from "./components/Pagination";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
      setCategories([...new Set(data.map((product) => product.category))]);
    };
    loadProducts();
  }, []);

  const handleSearch = (term: string) => {
    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category: string) => {
    if (!category) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
    setCurrentPage(1);
  };

  const handleSort = (criteria: string) => {
    const sorted = [...filteredProducts].sort((a, b) =>
      criteria === "title"
        ? a.title.localeCompare(b.title)
        : (a as any)[criteria] - (b as any)[criteria]
    );
    setFilteredProducts(sorted);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
    setFilteredProducts([newProduct, ...filteredProducts]);
    setShowForm(false);
  };

  // Pagination calculation
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-blue-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-pink-600 drop-shadow-md">
            Seller Dashboard
          </h1>
          <p className="text-pink-500 mt-2 text-lg">
            Manage your products smartly!
          </p>
        </header>

        {/* Search, Filter, Sort Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-10">
          <SearchBar onSearch={handleSearch} />
          <CategoryFilter categories={categories} onFilter={handleCategoryFilter} />
        </div>

        <div className="flex justify-center mb-8">
          <SortOptions onSort={handleSort} />
        </div>

        {/* Add Product Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-xl transition duration-300 shadow-lg"
          >
            {showForm ? "Close Form" : "Add New Product"}
          </button>
        </div>

        {showForm && (
          <ProductFormModal onAddProduct={handleAddProduct} />
        )}

        {/* Product Table */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden mb-10">
          <ProductTable products={currentProducts} />
        </div>

        {/* Pagination */}
        <div className="flex justify-center mb-10">
          <Pagination
            totalProducts={filteredProducts.length}
            productsPerPage={productsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
