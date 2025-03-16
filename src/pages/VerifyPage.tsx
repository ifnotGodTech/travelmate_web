import { useState, useEffect } from "react";
import AuthNavbar from "../components/AuthNavbar";

export default function VerifyEmail() {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState<number>(10);


  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 3) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
    }
  };

  // Automatically countdown the resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <AuthNavbar />
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
        <p className="text-gray-600 mt-2">Kindly enter the 4-digit code we sent to Name@gmail.com</p>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            maxLength={1}
            className="w-16 h-16 text-2xl text-center border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      <button className="mt-6 w-full max-w-xs bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
        Continue
      </button>

      <p className="text-gray-600 mt-4">Didn’t receive an email?</p>
      <p className="text-gray-500">
        You can request another in <span className="font-semibold">{resendTimer}s</span>
      </p>

      <p className="text-gray-500 text-sm mt-10 max-w-sm text-center">
        By continuing, you have read and agree to our{" "}
        <a href="#" className="text-blue-600 hover:underline">Terms of Use</a> and{" "}
        <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
      </p>
    </div>
  );
}
