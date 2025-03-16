import { Routes, Route } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount";

import Home from "./pages/Home";

import './App.css'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
  );
}

export default App
