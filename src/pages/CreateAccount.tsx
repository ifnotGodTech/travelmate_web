import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Logo from "/src/assets/Logo.svg";

export default function CreateAccount() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      {/* Navbar */}
      <div className="w-full flex items-center justify-between py-4 border-b shadow-md">
        <button>
          <span className="icon-wrapper shadow-r-md">
            <MdClose />
          </span>
        </button>
        <img src={Logo} alt="Travel Mate Logo" className="h-14" />
        <div className="w-8"></div> {/* Placeholder to balance layout */}
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md text-center mt-8 px-6">
        <h1 className="text-3xl font-bold text-[#023E8A]">Create an account or Log In</h1>
        <p className="text-gray-700 mt-2 w-full max-w-none">
          Unlock personalized deals and earn rewards with your Travel Mate account.
        </p>


        {/* Email Input */}
        <div className="mt-6 text-left">
          <label className="block text-gray-700 font-medium mb-1">Email Address</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
            placeholder="Name@email.com"
          />
        </div>

        {/* Continue Button */}
        <button className="w-full bg-[#023E8A] text-white py-2.5 rounded-lg mt-3 hover:bg-[#012A5D] transition">
          Continue
        </button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="px-4 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login Buttons */}
        <button className="w-full border border-[#023E8A] text-[#023E8A] flex items-center justify-center py-2.5 rounded-lg mb-2 hover:bg-gray-100 transition">
          <span className="icon-wrapper">
            <FaGoogle />
          </span>
          Continue with Google
        </button>

        <button className="w-full border border-[#023E8A] text-[#023E8A] flex items-center justify-center py-2.5 rounded-lg mb-2 hover:bg-gray-100 transition">
          <span className="icon-wrapper">
            <FaApple />
          </span>
          Continue with Apple
        </button>

        <button className="w-full border border-[#023E8A] text-[#023E8A] flex items-center justify-center py-2.5 rounded-lg hover:bg-gray-100 transition">
          <span className="icon-wrapper">
            <FaFacebook />
          </span>
          Continue with Facebook
        </button>

        {/* Terms and Privacy */}
        <p className="text-gray-700 text-sm text-center mt-5">
          By continuing, you have read and agree with our{" "}
          <a href="#" className="text-[#023E8A] font-medium hover:underline">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#023E8A] font-medium hover:underline">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
}
