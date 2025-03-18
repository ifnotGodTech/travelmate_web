import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md"
import AuthNav from "../components/AuthNavbar";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleResetLink = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Full-width Navbar */}
      <AuthNav />

      {/* Centered Content */}
      <div className="flex flex-col items-center flex-1 px-4">
        <div className="text-center w-full max-w-[660px] mt-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Reset Your Password</h2>
          <p className="text-gray-600 text-lg mb-6">
            Enter your email address and we will send you a link to reset your password.
          </p>

          <form onSubmit={handleResetLink} className="text-left">
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
                <MdOutlineEmail />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="name@gmail.com"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-[#0450A2] text-white font-semibold py-2 rounded-lg w-full mt-4 hover:bg-[#023E8A] transition"
            >
              Send Reset Link
            </button>
          </form>

          {/* Terms and Privacy */}
          <p className="text-gray-700 text-sm text-center mt-40">
            By continuing, you agree to our{" "}
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
    </div>
  );
}
