import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Dashboard from "./pages/Dashboard";
import Jenjang from "./pages/jenjangPendidikan/Jenjang";
import Fakultas from "./pages/fakultas/Fakultas";
import Prodi from "./pages/prodi/Prodi";
import Mahasiswa from "./pages/mahasiswa/Mahasiswa";

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
          <Route path="/fakultas" element={<Fakultas />} />
          <Route path="/prodi" element={<Prodi />} />
          <Route path="/mahasiswa" element={<Mahasiswa />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
