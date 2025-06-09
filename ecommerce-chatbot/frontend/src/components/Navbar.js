import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./sss.png";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("username");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navLinkClasses =
    "px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-500 transition text-white shadow";

  return (
    <nav className="bg-gray-900 px-8 py-6 flex items-center justify-between shadow-md min-h-[80px]">
      {/* Left nav links */}
      <div className="flex gap-4 text-sm md:text-base font-medium items-center">
        <Link to="/" className={navLinkClasses}>Home</Link>
        <Link to="/chat" className={navLinkClasses}>Chatbot</Link>
      </div>

      {/* Center Logo */}
      <div className="flex justify-center items-center">
        <img src={logo} alt="Logo" className="h-14 object-contain" />
      </div>

      {/* Right nav links */}
      <div className="flex gap-3 text-sm md:text-base font-medium items-center">
        <Link to="/products" className={navLinkClasses}>Products</Link>
        <Link to="/admin/logs" className={navLinkClasses}>Logs</Link>
        {!isLoggedIn ? (
          <>
            <Link to="/login" className={navLinkClasses}>Login</Link>
            <Link to="/register" className={navLinkClasses}>Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className={navLinkClasses}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
