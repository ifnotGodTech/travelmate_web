import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import './App.css'
import DeparturePage from "./pages/departureFlight/DeparturePage";
import ReturnPage from "./pages/returnFlight/ReturnPage";
import FlightInfoPage from "./pages/flightInfo-review/FlightInfoPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/departure-flight" element={<DeparturePage departureInfo={[]} />} />
      <Route path="/return-flight" element={<ReturnPage departureInfo={[]} />} />
      <Route path="/flightInfo-review" element={<FlightInfoPage />} />

    </Routes>
  );
}

export default App
