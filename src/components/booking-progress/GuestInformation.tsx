import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaExclamationCircle } from "react-icons/fa";

const GuestInformation: React.FC = () => {
  const [useProfileInfo, setUseProfileInfo] = useState(false);

  // State for the form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // You can replace this with an API request
    console.log("Form Submitted:", { firstName, lastName, email, phoneNumber, dateOfBirth });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold ml-5 md:ml-1 mb-2">Guest Information</h3>

      <form onSubmit={handleSubmit} className="w-full md:w-[628px] md:border border-gray-300 rounded-lg p-6 space-y-4">
        {/* Notification */}
        <div className="bg-blue-100 border border-[#023E8A] px-4 py-3 rounded-lg flex flex-row items-start sm:items-center gap-3 w-full">
          <div className="pt-1">
            <FaExclamationCircle className="text-[#023E8A] text-lg mt-4 sm:mt-0 sm:text-xl" />
          </div>
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
            Guests checking into hotel rooms must be 21 or older and should present a valid photo ID card.
          </p>
        </div>

        <hr className="border-gray-300" />

        {/* Profile Info Toggle */}
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <p className="font-semibold text-left">Use my profile information</p>
            <p className="text-sm text-gray-600 text-left">
              This field will be automatically filled based on your information with us.
            </p>
          </div>
          {/* Toggle Switch */}
          <div
            className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${useProfileInfo ? "bg-blue-600" : ""}`}
            onClick={() => setUseProfileInfo(!useProfileInfo)}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform ${useProfileInfo ? "translate-x-5" : ""}`}
            />
          </div>
        </div>

        <hr className="border-gray-300" />

        {/* Form */}
        <div>
          <p className="font-semibold">Primary Guest</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {/* First Name */}
            <div className="flex items-center border border-gray-300 p-2 md:rounded-lg">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="First Name"
                className="w-full outline-none bg-transparent"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            {/* Last Name */}
            <div className="flex items-center border border-gray-300 p-2 rounded-md">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full outline-none bg-transparent"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            {/* Email Address */}
            <div className="flex items-center border border-gray-300 p-2 rounded-md">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full outline-none bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // Email pattern validation
              />
            </div>

            {/* Phone Number */}
            <div className="flex items-center border border-gray-300 p-2 rounded-md">
              <FaPhone className="text-gray-500 mr-2" />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full outline-none bg-transparent"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                pattern="^\+?[0-9]{10,15}$" // Phone number pattern validation (basic)
              />
            </div>

            {/* Date of Birth (Full Width) */}
            <div className="flex items-center border border-gray-300 p-2 rounded-md col-span-1 md:col-span-2">
              <FaCalendarAlt className="text-gray-500 mr-2" />
              <input
                type="date"
                className="w-full outline-none bg-transparent"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default GuestInformation;
