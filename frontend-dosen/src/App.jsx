import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Profil from "./pages/profil/Profil"
import KRS from "./pages/krs/KRS"
import HistoryKrs from "./pages/krs/HistoryKrs"
import Jadwal from "./pages/jadwal/Jadwal"
import Chat from "./pages/chat/Chat"
import ListPengumuman from "./pages/pengumuman/ListPengumuman"
import KHS from "./pages/khs/KHS"
import Berhenti from "./pages/berhentiStudi/Berhenti"
import TambahPengajuan from "./pages/berhentiStudi/TambahPengajuan"
import UpdatePengajuan from "./pages/berhentiStudi/UpdatePengajuan"
import Forgot from "./pages/Forgot"
import Verification from "./pages/Verification"
import ChangePassword from "./pages/ChangePassword"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/karturencanastudi" element={<KRS />} />
          <Route path="/historykrs" element={<HistoryKrs />} />
          <Route path="/kartuhasilstudi" element={<KHS />} />
          <Route path="/jadwalkuliah" element={<Jadwal />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/pengumuman" element={<ListPengumuman />} />
          <Route path="/pengajuanstudi" element={<Berhenti />} />
          <Route path="/tambahpengajuan" element={<TambahPengajuan />} />
          <Route path="/updatepengajuan" element={<UpdatePengajuan />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/changepass" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
