import React from 'react';


const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#232752] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="../src/assets/Image/logo.png" alt="Logo" className="h-8 w-auto  " />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-sm tracking-wide">
          <a href="/user/home" className="hover:text-gray-300">HOME</a>
          <a href="/services" className="hover:text-gray-300">SERVICES</a>
          <a href="/bookings" className="hover:text-gray-300">BOOKINGS</a>
          <a href="/explore" className="hover:text-gray-300">EXPLORE</a>
          <a href="/membership" className="hover:text-gray-300">MEMBERSHIP</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;