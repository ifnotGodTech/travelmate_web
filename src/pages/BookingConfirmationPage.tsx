import React, { useState } from "react";
import Navbar from "../pages/homePage/Navbar";
import { FaShareAlt, FaDownload } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import ConfirmationDetails from "../components/confirmation/ConfirmationDetails";
import GuestDetails from "../components/confirmation/GuestDetails";
import PriceSummary from "../components/confirmation/PriceSummary";
import HotelDetails from "../components/confirmation/HotelDetails";
import RoomDetails from "../components/confirmation/RoomDetails";
import BackHomeButton from "../components/confirmation/BackHomeButton";
import ContactDetails from "../components/confirmation/ContactDetails";
import Footer from "../components/2Footer";
import ShareModal from "../components/modals/ShareModal";

const guests = [
  { name: "Elvis Presley", email: "elvis@gmail.com", phone: "+234 800 123 4567", dob: "11/08/2024" },
  // { name: "Michael Jackson", email: "michael@gmail.com", phone: "+234 901 234 5678", dob: "29/08/2024" },
];



const BookingConfirmationPage: React.FC = () => {

  const [showShareModal, setShowShareModal] = useState(false);
  
  return (
    <div>
      <Navbar />
      <div className="w-[93%] mx-auto mt-26 px-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Booking Confirmation</h1>
          <div className="flex gap-3 flex-wrap">
            <button
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
              onClick={() => setShowShareModal(true)}
            >
              <FaShareAlt size={18} />
              Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
              <FaDownload size={18} />
              Download
            </button>
          </div>
          {showShareModal && <ShareModal onClose={() => setShowShareModal(false)} shareLink={""} />}
        </div>
  
        {/* Notification */}
        <div className="bg-green-50 border border-green-600 px-4 py-2 mb-6 rounded-lg flex sm:flex-row items-start sm:items-center gap-3">
        <div className="pt-1 sm:pt-0 flex justify-center sm:justify-start items-center">
          <GrStatusGood size={24} className="text-green-600 mt-5 sm:mt-0" />
        </div>
          <p>
            <span className="font-semibold">Payment Successful</span> and your stay is confirmed. Booking confirmation will
            also be sent to <span className="font-semibold">elvis@gmail.com</span>.
          </p>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-8 sm:space-y-4">
            <ConfirmationDetails />
            <GuestDetails guests={guests} />
          </div>
  
          <div className="space-y-4">
            <PriceSummary />
            <RoomDetails />
            <HotelDetails />
            <ContactDetails />
            <BackHomeButton />
          </div>
        </div>
      </div>
  
      <Footer />
    </div>
  );
  
};

export default BookingConfirmationPage;
