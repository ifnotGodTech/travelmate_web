import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import './App.css'
// import DeparturePage from "./pages/departureFlight/DeparturePage";
import DeparturePage from "./pages/departureFlight/DeparturePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/departure-flight" element={<DeparturePage departureInfo={[]} />} />
      

    </Routes>
  );
}

export default App
