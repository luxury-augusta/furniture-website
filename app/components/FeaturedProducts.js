"use client";
import Image from "next/image";

export default function FeaturedProducts() {
  return (
    <section className="container mx-auto px-6 py-20">
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