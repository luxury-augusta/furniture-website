"use client";

import { useState } from "react";

export default function CustomOrder() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    budget: "Under ₹5,000",
    category: "Sofa",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare message
    const messageContent = 
      `Hello, I would like a custom order:

Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Budget: Rs. ${formData.budget}
Category: ${formData.category}

${formData.message}`;
    
    // Phone number must be in international format without + or spaces
    const phoneNumber = "919797076363";
    
    // Try using the direct chat.whatsapp.com API which works better for desktop and first-time contacts
    try {
      // For desktop - use WhatsApp Web
      if (window.innerWidth >= 768) {
        const encodedMessage = encodeURIComponent(messageContent);
        window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
      } 
      // For mobile - use WhatsApp App
      else {
        const encodedMessage = encodeURIComponent(messageContent);
        window.open(`whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
        
        // Fallback for iOS or if deep linking fails
        setTimeout(() => {
          window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
        }, 300);
      }
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
      // Final fallback
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageContent)}`, '_blank');
    }
    
    // Reset form state
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm text-gray-600 mb-4">CREATE YOUR VISION</h2>
          <h1 className="mb-6 flex flex-col items-center justify-center">
            <span className="font-cormorant text-5xl md:text-6xl font-semibold tracking-wide">
              CUSTOM ORDER
            </span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Let us help bring your dream furniture to life. Fill out the form
            below to request a custom order tailored specifically to your needs.
          </p>
        </div>
      </section>

      {/* Custom Order Form */}
      <section className="container mx-auto px-6 pb-20">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h3 className="font-cormorant text-2xl font-semibold mb-6">
            Request a Custom Order
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#526D5F]"
                placeholder="Your Name"
              />
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#526D5F]"
                placeholder="Your Email"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#526D5F]"
                placeholder="Your phone number"
              />
            </div>

            {/* Budget Range */}
            <div>
              <label
                htmlFor="budget"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Estimated Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#526D5F]"
              >
                <option value="Under 5000">Under ₹5,000</option>
                <option value="5000-10000">₹5,000 - ₹10,000</option>
                <option value="10000-20000">₹10,000 - ₹20,000</option>
                <option value="20000-30000">₹20,000 - ₹30,000</option>
                <option value="30000-40000">₹30,000 - ₹40,000</option>
                <option value="40000-50000">₹40,000 - ₹50,000</option>
                <option value="50000-60000">₹50,000 - ₹60,000</option>
                <option value="60000-70000">₹60,000 - ₹70,000</option>
                <option value="70000-80000">₹70,000 - ₹80,000</option>
                <option value="80000-90000">₹80,000 - ₹90,000</option>
                <option value="90000-100000">₹90,000 - ₹1,00,000</option>
                <option value="Above 100000">Above ₹1,00,000</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Product Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#526D5F]"
              >
                <option value="Sofa">Sofa</option>
                <option value="Chesterfield">Chesterfield Sofa</option>
                <option value="Ottoman">Ottoman</option>
                <option value="Carved">Carved Furniture</option>
                <option value="Dining">Dining Table</option>
                <option value="Bed">Bed</option>
                <option value="Other">Other (Please specify in message)</option>
              </select>
            </div>

            {/* Additional Information */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Additional Information
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#526D5F]"
                placeholder="Tell us more about your custom furniture needs..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-8 py-3 rounded-md transition-colors flex items-center justify-center gap-2 ${
                isSubmitting 
                  ? "bg-gray-400 text-white cursor-not-allowed" 
                  : "bg-[#526D5F] text-white hover:bg-[#3A4F44]"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M3 7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2Z"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              {isSubmitting ? "Opening WhatsApp..." : "Get a Quotation on WhatsApp"}
            </button>
          </form>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-[#F5F2EF] py-20">
        <div className="container mx-auto px-6">
          <h2 className="font-cormorant text-3xl md:text-4xl font-semibold text-center mb-12">
            Why Choose a Custom Order?
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
                Personalized Design
              </h3>
              <p className="text-gray-600">
                Furniture tailored to your exact specifications, style
                preferences, and space requirements.
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
                Superior Quality
              </h3>
              <p className="text-gray-600">
                Handcrafted by skilled artisans using premium materials for
                durability and lasting beauty.
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
                Timely Delivery
              </h3>
              <p className="text-gray-600">
                We work diligently to ensure your custom piece is delivered
                within the agreed timeframe.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
