"use client";
import Head from 'next/head';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Contact Us - Augusta Luxury</title>
        <meta name="description" content="Get in touch with Augusta Luxury. We're here to help you find the perfect furniture piece for your home. Contact us for inquiries, custom orders, or showroom visits." />
        <meta name="keywords" content="contact augusta luxury, furniture inquiries, custom furniture orders, luxury furniture showroom" />
        <link rel="canonical" href="https://augustaluxury.in/contact" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contact Us - Augusta Luxury" />
        <meta property="og:description" content="Get in touch with Augusta Luxury. We're here to help you find the perfect furniture piece for your home. Contact us for inquiries, custom orders, or showroom visits." />
        <meta property="og:url" content="https://augustaluxury.in/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://augustaluxury.in/images/contact-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Augusta Luxury Contact" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - Augusta Luxury" />
        <meta name="twitter:description" content="Get in touch with Augusta Luxury. We're here to help you find the perfect furniture piece for your home. Contact us for inquiries, custom orders, or showroom visits." />
        <meta name="twitter:image" content="https://augustaluxury.in/images/contact-twitter.jpg" />
      </Head>

      <main className="min-h-screen py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-6">
                Have questions about our products or interested in a custom order? We&&apos;d love to hear from you.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#526D5F] focus:ring-[#526D5F] sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#526D5F] focus:ring-[#526D5F] sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#526D5F] focus:ring-[#526D5F] sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#526D5F] focus:ring-[#526D5F] sm:text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#526D5F] text-white px-4 py-2 rounded-md hover:bg-[#3A4F44] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Visit Our Showroom</h2>
              <p className="text-gray-600 mb-4">
                We invite you to visit our showroom to experience our furniture collection in person.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">123 Luxury Street, Furniture District, City</p>
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">info@augustaluxury.in</p>
                </div>
                <div>
                  <h3 className="font-semibold">Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 