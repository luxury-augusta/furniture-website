"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getImagesByTag } from "@/utils/cloudinary";

export default function CategoryPage({ title, description, tag }) {
  // State for images and loading
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for image preview modal
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch images from Cloudinary
  useEffect(() => {
    async function fetchImages() {
      setIsLoading(true);
      try {
        const fetchedImages = await getImagesByTag(tag);
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, [tag]);

  // Functions to handle image preview modal
  function openImagePreview(image) {
    setSelectedImage(image);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  }

  function closeImagePreview() {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  }

  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-cormorant text-5xl md:text-6xl font-semibold text-gray-800 mb-8">
            {title}
          </h1>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex justify-center mb-12">
            <Link href="/products" className="text-[#526D5F] hover:text-[#3A4F44] flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-6">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#526D5F]"></div>
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 max-w-7xl mx-auto">
            {images.map((image, index) => (
              <div key={image.public_id} className="group">
                <div 
                  className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
                  onClick={() => openImagePreview(image.secure_url)}
                >
                  <Image
                    src={image.secure_url}
                    alt={`${title} Design ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500">No images found in this category.</p>
          </div>
        )}
      </section>

      {/* Custom Order CTA */}
      <section className="container mx-auto px-6 mt-20">
        <div className="max-w-4xl mx-auto text-center bg-[#F5F2EF] rounded-xl p-10">
          <h2 className="font-cormorant text-3xl md:text-4xl font-semibold mb-6 text-gray-800">
            Looking for a Custom {title} Design?
          </h2>
          <p className="text-gray-600 mb-8">
            Our master craftsmen can create a bespoke design with custom patterns, dimensions, and finishes to match your vision.
          </p>
          <Link
            href="/custom-order"
            className="inline-block bg-[#526D5F] text-white px-8 py-3 rounded-md hover:bg-[#3A4F44] transition-colors"
          >
            Request Custom Order
          </Link>
        </div>
      </section>

      {/* Image Preview Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={closeImagePreview}>
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100"
              onClick={closeImagePreview}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage}
                alt={`${title} Preview`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 