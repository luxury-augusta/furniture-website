"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImagesByTag } from "@/utils/cloudinary";

export default function CategoryGrid() {
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
        
        // Fetch first image for each category
        const categoriesWithImages = await Promise.all(
          data.tags.map(async (category) => {
            try {
              const images = await getImagesByTag(category.slug);
              return {
                ...category,
                image: images.length > 0 ? images[0].secure_url : '/images/placeholder.jpg',
                link: `/products/${category.slug}`
              };
            } catch (error) {
              console.error(`Error fetching images for category ${category.name}:`, error);
              return {
                ...category,
                image: '/images/placeholder.jpg',
                link: `/products/${category.slug}`
              };
            }
          })
        );
        
        setCategories(categoriesWithImages);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#526D5F]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
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

  return (
    <section className="container mx-auto px-6 py-20">
      <h2 className="text-gray-600 mb-4">Discover Our Signature Pieces</h2>
      <h3 className="font-cormorant text-4xl md:text-5xl font-semibold mb-12">
        CRAFTED FOR ELEGANCE
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {categories.map((category) => (
          <div key={category.id} className="space-y-4 group">
            <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="flex justify-between items-center">
              <h4 className="font-cormorant text-xl font-semibold">{category.name}</h4>
              <Link
                href="/products"
                className="text-[#526D5F] hover:text-[#3A4F44] text-sm font-medium transition-colors"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 