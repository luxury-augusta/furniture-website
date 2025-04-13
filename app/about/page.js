"use client";
import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Augusta Luxury</title>
        <meta name="description" content="Discover the story behind Augusta Luxury. We are dedicated to crafting premium furniture pieces that combine timeless elegance with modern comfort." />
        <meta name="keywords" content="about augusta luxury, luxury furniture makers, premium furniture craftsmanship, furniture design studio" />
        <link rel="canonical" href="https://augustaluxury.in/about" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About Us - Augusta Luxury" />
        <meta property="og:description" content="Discover the story behind Augusta Luxury. We are dedicated to crafting premium furniture pieces that combine timeless elegance with modern comfort." />
        <meta property="og:url" content="https://augustaluxury.in/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://augustaluxury.in/images/about-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Augusta Luxury Showroom" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - Augusta Luxury" />
        <meta name="twitter:description" content="Discover the story behind Augusta Luxury. We are dedicated to crafting premium furniture pieces that combine timeless elegance with modern comfort." />
        <meta name="twitter:image" content="https://augustaluxury.in/images/about-twitter.jpg" />
      </Head>

      <div className="pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-sm text-gray-600 mb-4">OUR STORY</h2>
            <h1 className="mb-6 flex flex-col md:flex-row md:items-baseline md:justify-center">
              <span className="font-cormorant text-5xl md:text-6xl font-semibold tracking-wide">AUGUSTA</span>
              <span className="font-cormorant text-5xl md:text-6xl font-semibold tracking-wide md:ml-3">LUXURY</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Welcome to Augusta Luxury, where elegance meets excellence. The brand offers high-end, bespoke pieces at unbeatable factory rates. Whether you&apos;re a project developer, interior designer, or discerning homeowner, we&apos;re dedicated to providing you with exceptional quality, unparalleled style, and outstanding value.
            </p>
            <p className="text-gray-600 text-lg mb-8">
              Our curated collection includes luxurious furniture, exquisite designer chandeliers, and expert interior design services.
            </p>
            <p className="text-gray-600 text-lg mb-8">
              At Augusta Luxury, we&apos;re passionate about helping you create spaces that inspire, uplift, and reflect your unique taste and sophistication. We are committed to provide Design and Build Services.
            </p>
            <p className="text-gray-600 text-lg mb-8">
              Join us on a journey of luxury, comfort, and refinement. Experience the Augusta Luxury difference.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#526D5F] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-cormorant text-2xl font-semibold mb-4">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on materials or craftsmanship, ensuring each
                piece meets our exacting standards.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#526D5F] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-cormorant text-2xl font-semibold mb-4">Bespoke Excellence</h3>
              <p className="text-gray-600">
                Each piece is crafted with attention to detail, offering custom solutions
                that reflect your unique style and requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#526D5F] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="font-cormorant text-2xl font-semibold mb-4">Design & Build</h3>
              <p className="text-gray-600">
                Our comprehensive service includes both design consultation and
                expert craftsmanship to bring your vision to life.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#526D5F] text-white py-20 mt-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-6">
              JOIN OUR JOURNEY
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Experience the difference of bespoke luxury furniture made with passion and
              precision.
            </p>
            <Link
              href="/custom-order"
              className="inline-block bg-[#C4A484] text-white px-8 py-3 rounded-md hover:bg-[#A88B6B] transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </div>
    </>
  );
} 