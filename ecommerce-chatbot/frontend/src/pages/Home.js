import React from "react";
import { useNavigate } from "react-router-dom";
import a from './b.jpg';
import b from './a.jpg';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">

      {/* Left half - Browse Products with background image */}
      <div
        className="w-1/2 flex flex-col items-center justify-center p-16 border-r-8 border-white text-white"
        style={{
          backgroundImage: `url(${a})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-5xl font-extrabold mb-8">
            Browse
          </h1>
          <p className="text-xl mb-12 max-w-md">
            Explore our amazing product collection!
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-teal-600 hover:bg-green-500 text-white font-semibold px-10 py-4 rounded-lg text-2xl transition shadow-lg"
          >
            🛍️ Browse Products
          </button>
        </div>
      </div>

      {/* Right half - Chatbot with background image */}
      <div
        className="w-1/2 flex flex-col items-center justify-center p-16 text-white"
        style={{
          backgroundImage: `url(${b})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-5xl font-extrabold mb-8">
            Chatbot
          </h1>
          <p className="text-xl mb-12 max-w-md">
            Use our chatbot for personalized product suggestions.
          </p>
          <button
            onClick={() => navigate("/chat")}
            className="bg-blue-600 hover:bg-yellow-400 text-white font-semibold px-10 py-4 rounded-lg text-2xl transition shadow-lg"
          >
            🤖 Talk to Chatbot
          </button>
        </div>
      </div>

    </div>
  );
}
