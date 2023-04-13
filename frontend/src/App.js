import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Dashboard from "./pages/Dashboard";
import Jenjang from "./pages/Jenjang";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jenjang" element={<Jenjang />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
