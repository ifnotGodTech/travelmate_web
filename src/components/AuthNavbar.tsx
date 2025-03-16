import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

export default function AuthNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-900">
        <IoClose size={24} />
      </button>
      <h1 className="text-xl font-bold text-gray-900">TravelMate</h1>
      <div className="w-6" /> {/* Empty space to balance layout */}
    </nav>
  );
}
