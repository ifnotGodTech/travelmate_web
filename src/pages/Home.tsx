import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 text-white">
      <h1 className="text-4xl font-bold">Welcome to TravelMate</h1>
      <p className="mt-4 text-3xl">Development In Progress...</p>
      <div className="mt-6">
        <Link to="/login" className="px-6 py-3 bg-white text-blue-500 rounded-lg mr-4">Login</Link>
        <Link to="/register" className="px-6 py-3 bg-purple-500 rounded-lg">Sign Up</Link>
      </div>
    </div>
  );
}
