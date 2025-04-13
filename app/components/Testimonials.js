"use client";
import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Interior Designer",
      image: "/images/testimonial1.jpg",
      content: "The quality and craftsmanship of Augusta Luxury's furniture is exceptional. Each piece tells a story of elegance and sophistication."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Homeowner",
      image: "/images/testimonial2.jpg",
      content: "I've been searching for the perfect dining set for months. Augusta Luxury exceeded my expectations with their attention to detail."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Architect",
      image: "/images/testimonial3.jpg",
      content: "The timeless designs and premium materials make Augusta Luxury my go-to choice for luxury furniture."
    }
  ];

  return (
    <section className="container mx-auto px-6 py-20">
      <h2 className="text-gray-600 mb-4">What Our Clients Say</h2>
      <h3 className="font-cormorant text-4xl md:text-5xl font-semibold mb-12">
        TESTIMONIALS
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <h4 className="font-cormorant text-xl font-semibold">{testimonial.name}</h4>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"{testimonial.content}"</p>
          </div>
        ))}
      </div>
    </section>
  );
} 