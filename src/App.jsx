import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Petitions from "./pages/dashboard/Petitions.jsx";
import Polls from "./pages/dashboard/Polls.jsx";
import Reports from "./pages/dashboard/Reports.jsx";
import Officials from "./pages/dashboard/Officials.jsx"; 
import HelpSupport from "./pages/dashboard/HelpSupport.jsx";
import Settings from "./pages/dashboard/Settings.jsx";
import Navbar from "./components/navigation/Navbar.jsx";
// App routing setup

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/petitions" element={<Petitions />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/officials" element={<Officials />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;