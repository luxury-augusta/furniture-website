"use client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-sm text-gray-600 mb-4">PREMIUM FURNITURE</h2>
          <h1 className="flex flex-col mb-6">
            <span className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-semibold tracking-wide leading-tight">
              AUGUSTA
            </span>
            <span className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-semibold tracking-wide">
              LUXURY
            </span>
          </h1>
          <p className="text-gray-600 mb-8">
            Welcome to our exclusive furniture collection, where we meticulously craft
            high-quality pieces that transform your living space into a sanctuary of elegance.
          </p>
          <Link
            href="/products"
            className="inline-block bg-[#526D5F] text-white px-8 py-3 rounded-md hover:bg-[#3A4F44] transition-colors"
          >
            Explore Our Collection
          </Link>
        </div>
        <div className="relative aspect-square rounded-full overflow-hidden">
          <Image
            src="/images/section1.jpg"
            alt="Premium Luxury Sofa"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
} 