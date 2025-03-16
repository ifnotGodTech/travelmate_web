import Navbar from "../components/2Navbar";
import Footer from "../components/2Footer";
import PopularDestinations from "../components/2PopularDestinations";
import DownloadApp from "../components/2DownloadApp";
import NewsletterSubscription from "../components/2SubscribeNewsletter";
import { useState } from "react";
import { AiOutlineCar } from "react-icons/ai";
import { GiCommercialAirplane, GiFamilyHouse } from "react-icons/gi";

export default function Home() {
  const [activeTab, setActiveTab] = useState("stays");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="bg-white py-6 px-6 md:px-10 shadow-lg border border-gray-300 rounded-2xl max-w-full mx-4 md:mx-14 mt-10">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-6 md:space-x-14 border-b-2 border-gray-300 w-full">
          {[
            { label: "Stays", icon: <GiFamilyHouse size={20} color="gray" /> },
            { label: "Flights", icon: <GiCommercialAirplane size={20} color="gray" /> },
            { label: "Cars", icon: <AiOutlineCar size={20} color="gray" /> },
          ].map((tab) => (
            <button
              key={tab.label}
              className={`flex items-center text-gray-700 font-semibold text-lg relative pb-2 ${
                activeTab === tab.label.toLowerCase() ? "text-blue-600" : ""
              }`}
              onClick={() => setActiveTab(tab.label.toLowerCase())}
            >
              {tab.icon} <span className="ml-2">{tab.label}</span>
              {activeTab === tab.label.toLowerCase() && (
                <span className="absolute left-0 bottom-0 w-full h-1 bg-orange-500"></span>
              )}
            </button>
          ))}
        </div>

        {/* Search Fields */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-end">
          {/* Destination Input */}
          <div>
            <label className="block text-gray-600 font-bold mb-1">Destination</label>
            <input
              type="text"
              placeholder="Search Destination"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Rooms & Guests Input */}
          <div>
            <label className="block text-gray-600 font-bold mb-1">Rooms & Guests</label>
            <input
              type="text"
              placeholder="1 Room, 1 Guest"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-gray-600 font-bold mb-1">Date</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Select Date"
              onFocus={(e) => {
                e.target.type = "date";
                e.target.showPicker();
              }}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
              }}
            />
          </div>

          {/* Search Button */}
          <button className="w-full md:w-[120px] bg-[#023E8A] text-white py-2 rounded-lg hover:bg-[#012A5D] transition justify-self-end">
            Search
          </button>
        </div>
      </section>

      <PopularDestinations />
      <DownloadApp />
      <NewsletterSubscription />
      <Footer />
    </div>
  );
}
