import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import b from './l.jpg';


export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get(`http://localhost:5000/api/products?q=${query}`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${b})` }} // ✅ Correct usage of imported image
    >
      <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Search Products</h2>

        <div className="flex mb-4 gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="border px-3 py-2 rounded w-full"
          />
          <button
            onClick={fetchProducts}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
