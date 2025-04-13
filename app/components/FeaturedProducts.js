"use client";
import Image from "next/image";

export default function FeaturedProducts() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-sm text-gray-600 mb-4 text-left">TIMELESS ELEGANCE</h2>
        <h1 className="font-cormorant text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide text-left">
          HANDCRAFTED MASTERPIECES
        </h1>
      </div>
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
        <Image
          src="/images/section3.jpg"
          alt="Our Craftsmanship"
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          sizes="100vw"
        />
      </div>
    </section>
  );
} 