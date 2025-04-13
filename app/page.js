"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getImagesByTag } from "@/utils/cloudinary";
import Head from 'next/head';
import Hero from "./components/Hero";
import CategoryGrid from "./components/CategoryGrid";
import FeaturedProducts from "./components/FeaturedProducts";

export default function Home() {
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
                link: `/products?category=${category.slug}`
              };
            } catch (error) {
              console.error(`Error fetching images for category ${category.name}:`, error);
              return {
                ...category,
                image: '/images/placeholder.jpg',
                link: `/products?category=${category.slug}`
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

  return (
    <>
      <Head>
        <title>Augusta Luxury - Premium Furniture & Home Decor</title>
        <meta
          name="description"
          content="Discover Augusta Luxury's exquisite collection of premium furniture and home decor. Handcrafted pieces that blend timeless elegance with modern design."
        />
        <meta
          name="keywords"
          content="luxury furniture, premium home decor, handcrafted furniture, Augusta Luxury, interior design, furniture store"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://augustaluxury.in" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://augustaluxury.in" />
        <meta property="og:title" content="Augusta Luxury - Premium Furniture & Home Decor" />
        <meta
          property="og:description"
          content="Discover Augusta Luxury's exquisite collection of premium furniture and home decor. Handcrafted pieces that blend timeless elegance with modern design."
        />
        <meta property="og:image" content="https://augustaluxury.in/images/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://augustaluxury.in" />
        <meta property="twitter:title" content="Augusta Luxury - Premium Furniture & Home Decor" />
        <meta
          property="twitter:description"
          content="Discover Augusta Luxury's exquisite collection of premium furniture and home decor. Handcrafted pieces that blend timeless elegance with modern design."
        />
        <meta property="twitter:image" content="https://augustaluxury.in/images/og-image.jpg" />
      </Head>

      <main>
        <Hero />
        <CategoryGrid />
        <FeaturedProducts />
      </main>
    </>
  );
}
