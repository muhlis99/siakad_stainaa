import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Chat from "./pages/chat/Chat"

// Mahasiswa
import Dashboard from "./pages/mhs/Dashboard"
import Forgot from "./pages/Forgot"
import Verification from "./pages/Verification"
import ChangePassword from "./pages/ChangePassword"
import Profil from "./pages/mhs/profil/Profil"
import KRS from "./pages/mhs/krs/KRS"
import HistoryKrs from "./pages/mhs/krs/HistoryKrs"
import NonPaket from "./pages/mhs/krs/NonPaket"
import Jadwal from "./pages/mhs/jadwal/Jadwal"
import ListPengumuman from "./pages/mhs/pengumuman/ListPengumuman"
import KHS from "./pages/mhs/khs/KHS"
import Berhenti from "./pages/mhs/berhentiStudi/Berhenti"
import TambahPengajuan from "./pages/mhs/berhentiStudi/TambahPengajuan"
import UpdatePengajuan from "./pages/mhs/berhentiStudi/UpdatePengajuan"

// Dosen
import Home from "./pages/dosen/Home"
import Profile from "./pages/dosen/profile/Profile"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/changepass" element={<ChangePassword />} />
          <Route path="/chat" element={<Chat />} />

          {/* Route Mahasiswa */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/karturencanastudi" element={<KRS />} />
          <Route path="/historykrs" element={<HistoryKrs />} />
          <Route path="/nonpaket" element={<NonPaket />} />
          <Route path="/kartuhasilstudi" element={<KHS />} />
          <Route path="/jadwalkuliah" element={<Jadwal />} />
          <Route path="/pengumuman" element={<ListPengumuman />} />
          <Route path="/pengajuanstudi" element={<Berhenti />} />
          <Route path="/tambahpengajuan" element={<TambahPengajuan />} />
          <Route path="/updatepengajuan" element={<UpdatePengajuan />} />


          {/* Route Dosen */}
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
