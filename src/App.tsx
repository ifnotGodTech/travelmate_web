import { Routes, Route } from "react-router-dom";
import './App.css'
import CreateAccount from "./pages/CreateAccount";
import VerifyPage from "./pages/VerifyPage";
import Home from "./pages/Home";
import CreatePassword from "./pages/CreatePassword";
import EmailResetLink from "./pages/EmailResetLink";
import ResetPassword from "./pages/ResetPassword";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/verify-page" element={<VerifyPage />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/reset-email-link" element={<EmailResetLink />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
  );
}

export default App
