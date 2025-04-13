"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF8]/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="Augusta Luxury Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="flex items-baseline">
              <span className="text-xl font-cormorant font-semibold tracking-wide">AUGUSTA</span>
              <span className="text-xl font-cormorant font-semibold tracking-wide ml-2">LUXURY</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/custom-order"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Custom Order
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
          </div>

          <button 
            className="md:hidden z-20" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              // Close icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`fixed top-0 left-0 right-0 bg-white shadow-lg z-10 md:hidden transition-transform duration-300 ease-in-out transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-[100%]"
        }`}
        style={{
          height: '30vh'
        }}
      >
        <div className="h-full overflow-y-auto bg-white">
          <div className="container mx-auto px-6 py-10 flex flex-col space-y-6 items-center text-center">
            <Link
              href="/"
              className="text-xl text-gray-700 hover:text-[#526D5F] font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-xl text-gray-700 hover:text-[#526D5F] font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/products"
              className="text-xl text-gray-700 hover:text-[#526D5F] font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/custom-order"
              className="text-xl text-gray-700 hover:text-[#526D5F] font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Custom Order
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 