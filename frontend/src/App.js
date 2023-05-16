import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Welcome from "./pages/Welcome"
import Login from "./pages/Login"
import Forgot from "./pages/Forgot"
import Dashboard from "./pages/Dashboard"
import Jenjang from "./pages/jenjangPendidikan/Jenjang"
import Fakultas from "./pages/fakultas/Fakultas"
import Prodi from "./pages/prodi/Prodi"
import Mahasiswa from "./pages/mahasiswa/Mahasiswa"
import Form1 from "./pages/mahasiswa/Form1"
import Form2 from "./pages/mahasiswa/Form2"
import Form3 from "./pages/mahasiswa/Form3"
import Form4 from "./pages/mahasiswa/Form4"
import Upload from "./pages/mahasiswa/Upload"
import Detail from "./pages/mahasiswa/Detail"

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
          <Route path="/mahasiswa/form1/:stat/:idMhs" element={<Form1 />} />
          <Route path="/mahasiswa/form2/:stat/:idMhs" element={<Form2 />} />
          <Route path="/mahasiswa/form3/:stat/:idMhs" element={<Form3 />} />
          <Route path="/mahasiswa/form4/:stat/:idMhs" element={<Form4 />} />
          <Route path="/mahasiswa/upload/:stat/:idMhs" element={<Upload />} />
          <Route path="/mahasiswa/detail/:idMhs" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
