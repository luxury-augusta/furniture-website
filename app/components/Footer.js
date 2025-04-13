import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#FDFBF8] pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="Augusta Luxury Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </Link>
            <div className="flex items-baseline mt-4">
              <span className="text-xl font-cormorant font-semibold tracking-wide">AUGUSTA</span>
              <span className="text-xl font-cormorant font-semibold tracking-wide ml-2">LUXURY</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              © 2025 Augusta Luxury, Inc.
              <br />
              All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-500 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/custom-order"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Custom Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-500">
                <span className="block">+91 97970 76363</span>
              </li>
              <li>
                <Link
                  href="mailto:augustaluxuryinfo@gmail.com"
                  className="text-gray-500 hover:text-gray-900"
                  target="_blank"
                >
                  augustaluxuryinfo@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 