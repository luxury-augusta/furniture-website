"use client";
import Head from 'next/head';
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

        {/* Why Choose Augusta Section */}
        <section className="bg-[#F5F2EF] py-20">
          <div className="container mx-auto px-6">
            <h2 className="font-cormorant text-3xl md:text-4xl font-semibold text-center mb-12">
              Why Choose Augusta Luxury?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-[#526D5F] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h3 className="font-cormorant text-xl font-semibold mb-3">
                  Exquisite Craftsmanship
                </h3>
                <p className="text-gray-600">
                  Each piece is meticulously crafted by skilled artisans with decades of experience in furniture making.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-[#526D5F] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="font-cormorant text-xl font-semibold mb-3">
                  Premium Materials
                </h3>
                <p className="text-gray-600">
                  We source only the finest materials to ensure exceptional quality, durability, and luxurious comfort.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-[#526D5F] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-cormorant text-xl font-semibold mb-3">
                  Customer Satisfaction
                </h3>
                <p className="text-gray-600">
                  Our dedication to excellence extends beyond our products to ensure a seamless and satisfying experience.
                </p>
              </div>
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