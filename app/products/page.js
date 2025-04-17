"use client";

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { getImagesByTag, transformToProducts } from '@/utils/cloudinary';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [showFullCategoryView, setShowFullCategoryView] = useState(!!categoryParam);
  const [allProducts, setAllProducts] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/tags');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.tags);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchAllProducts() {
      if (categories.length === 0) return;
      
      try {
        const fetchPromises = categories.map(async (category) => {
          const images = await getImagesByTag(category.slug);
          return { 
            categoryId: category.slug, 
            products: transformToProducts(images, category.name) 
          };
        });

        const results = await Promise.all(fetchPromises);
        
        const products = {};
        results.forEach(result => {
          products[result.categoryId] = result.products;
        });
        
        setAllProducts(products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }

    fetchAllProducts();
  }, [categories]);

  useEffect(() => {
    if (showFullCategoryView && selectedCategory !== 'all') {
      const fetchCategoryImages = async () => {
        try {
          const category = categories.find(c => c.slug === selectedCategory);
          if (category) {
            const images = await getImagesByTag(category.slug);
          }
        } catch (error) {
          console.error('Failed to fetch category images:', error);
        }
      };
      
      fetchCategoryImages();
    }
  }, [selectedCategory, showFullCategoryView, categories]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowFullCategoryView(categoryId !== 'all');
    
    const url = new URL(window.location);
    if (categoryId === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', categoryId);
    }
    window.history.pushState({}, '', url);
  };

  function openImagePreview(image) {
    setSelectedImage(image);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  }

  function closeImagePreview() {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  }

  const getFilteredProducts = () => {
    if (selectedCategory === 'all') {
      return Object.values(allProducts).flat();
    }
    return allProducts[selectedCategory] || [];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#526D5F]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#526D5F] text-white rounded-md hover:bg-[#3A4F44]"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">No categories found</p>
        <Link
          href="/admin9876/dashboard"
          className="px-4 py-2 bg-[#526D5F] text-white rounded-md hover:bg-[#3A4F44]"
        >
          Add Categories
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Our Products - Augusta Luxury</title>
        <meta name="description" content="Explore our premium collection of luxury furniture including carved sofas, chesterfield loungers, dining lighting, and ottoman bench sofas. Handcrafted excellence for your home." />
        <meta name="keywords" content="luxury furniture, carved sofas, chesterfield sofa, dining lighting, ottoman bench, premium furniture, designer furniture" />
        <link rel="canonical" href="https://augustaluxury.in/products" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Our Products - Augusta Luxury" />
        <meta property="og:description" content="Explore our premium collection of luxury furniture including carved sofas, chesterfield loungers, dining lighting, and ottoman bench sofas." />
        <meta property="og:url" content="https://augustaluxury.in/products" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://augustaluxury.in/images/products-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Augusta Luxury Products Collection" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Products - Augusta Luxury" />
        <meta name="twitter:description" content="Explore our premium collection of luxury furniture including carved sofas, chesterfield loungers, dining lighting, and ottoman bench sofas." />
        <meta name="twitter:image" content="https://augustaluxury.in/images/products-twitter.jpg" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-36 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
          
          {/* Category Navigation */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === 'all'
                  ? 'bg-[#526D5F] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.slug)}
                className={`px-4 py-2 rounded-md hover:cursor-pointer ${
                  selectedCategory === category.slug
                    ? 'bg-[#526D5F] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredProducts().map((product, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                  <Image
                    width={1000}
                    height={1000}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => openImagePreview(product)}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {product.name}
                  </h2>
                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      href={`/custom-order?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category)}&image=${encodeURIComponent(product.image)}`}
                      className="px-4 py-2 bg-[#526D5F] text-white rounded-md hover:bg-[#3A4F44] transition-colors duration-300 w-full text-center"
                    >
                      Get a Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image Preview Modal */}
          {showModal && selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="relative max-w-4xl w-full mx-4">
                <button
                  onClick={closeImagePreview}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2"
                  aria-label="Close preview"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <Image
                  width={1000}
                  height={1000}
                  src={selectedImage.image}
                  alt={selectedImage.name}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function Products() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#526D5F]"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
} 