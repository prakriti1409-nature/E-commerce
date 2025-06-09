import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="border p-4 bg-white rounded shadow-md">
      <h3 className="font-bold">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="text-lg font-semibold text-green-600">₹{product.price}</p>
      <p className="text-sm">{product.description}</p>
    </div>
  );
}
