import React from "react";
import NewsletterImage from "../assets/images/newsletter-image.png";
import { MdOutlineEmail } from "react-icons/md";

const NewsletterSubscription: React.FC = () => {
  return (
    <section className="bg-[#F0F4FA] py-10 px-6 md:px-10 lg:px-14 mt-10 flex flex-col md:flex-row items-center justify-between">
      {/* Left Side - Text and Input */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-900">Get updates and exclusive offers</h2>
        <p className="text-gray-700 mt-2">
          Subscribe to our newsletter and never miss out on great deals.
        </p>

        {/* Email Input and Subscribe Button */}
        <div className="flex flex-col sm:flex-row items-center mt-4 space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative w-full sm:w-3/5">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
              <MdOutlineEmail />
            </span>
            <input
              type="email"
              placeholder="Enter Email Address"
              className="border border-gray-300 rounded-lg pl-12 pr-4 py-2 w-full h-10 focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>
          <button className="bg-[#023E8A] text-white px-5 py-2 rounded-lg hover:bg-[#012A5D] transition w-full sm:w-auto">
            Subscribe
          </button>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0">
        <img src={NewsletterImage} alt="Newsletter" className="w-[300px] sm:w-[400px] md:w-[500px] h-auto rounded-xl object-cover" />
      </div>
    </section>
  );
};

export default NewsletterSubscription;
