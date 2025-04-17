import React from 'react';

const Header = () => {
  return (
    <header className="bg-[#232752] text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logoipsum.svg" alt="Logo" className="h-8 w-auto" />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-sm tracking-wide">
          <a href="#" className="hover:text-gray-300">HOME</a>
          <a href="#" className="hover:text-gray-300">SERVICES</a>
          <a href="#" className="hover:text-gray-300">BOOKINGS</a>
          <a href="#" className="hover:text-gray-300">EXPLORE</a>
          <a href="#" className="hover:text-gray-300">MEMBERSHIP</a>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button className="border border-white px-4 py-1 rounded text-sm hover:bg-white hover:text-[#232752] transition">
            Register
          </button>
          <button className="bg-white text-[#232752] px-4 py-1 rounded text-sm font-semibold hover:opacity-90 transition">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
