import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-36 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-9xl font-bold text-[#526D5F] mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/"
              className="px-6 py-3 bg-[#526D5F] text-white rounded-md hover:bg-[#3A4F44] transition-colors duration-300"
            >
              Go Home
            </Link>
            <Link
              href="/products"
              className="px-6 py-3 bg-white text-[#526D5F] border border-[#526D5F] rounded-md hover:bg-gray-50 transition-colors duration-300"
            >
              View Products
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 