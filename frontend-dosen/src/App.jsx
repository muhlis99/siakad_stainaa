import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Chat from "./pages/chat/Chat"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"

// Mahasiswa
import Forgot from "./pages/Forgot"
import Verification from "./pages/Verification"
import ChangePassword from "./pages/ChangePassword"
import Profil from "./pages/mhs/profil/Profil"
import KRS from "./pages/mhs/krs/KRS"
import HistoryKrs from "./pages/mhs/krs/HistoryKrs"
import NonPaket from "./pages/mhs/krs/NonPaket"
import Jadwal from "./pages/mhs/jadwal/Jadwal"
import ListPengumuman from "./pages/pengumuman/ListPengumuman"
import KHS from "./pages/mhs/khs/KHS"
import Berhenti from "./pages/mhs/berhentiStudi/Berhenti"
import TambahPengajuan from "./pages/mhs/berhentiStudi/TambahPengajuan"
import UpdatePengajuan from "./pages/mhs/berhentiStudi/UpdatePengajuan"

// Dosen
import Profile from "./pages/dosen/profile/Profile"
import MahasiswaAsuh from "./pages/dosen/mhsAsuh/MahasiswaAsuh"
import ListMahasiswa from "./pages/dosen/KRS/ListMahasiswa"
import DetailKrs from "./pages/dosen/KRS/DetailKrs"
import JadwalDosen from "./pages/dosen/jadwalDosen/JadwalDosen"
import ListKelas from "./pages/dosen/penilaian/ListKelas"
import ListPengajuan from "./pages/dosen/pengajuanStudi/ListPengajuan"
import InfoNilai from "./pages/dosen/penilaian/InfoNilai"
import InputNilai from "./pages/dosen/penilaian/InputNilai"
import EditNilai from "./pages/dosen/penilaian/EditNilai"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Route */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/changepass" element={<ChangePassword />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/pengumuman" element={<ListPengumuman />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Route Mahasiswa */}
          <Route path="/profil" element={<Profil />} />
          <Route path="/karturencanastudi" element={<KRS />} />
          <Route path="/historykrs" element={<HistoryKrs />} />
          <Route path="/nonpaket" element={<NonPaket />} />
          <Route path="/kartuhasilstudi" element={<KHS />} />
          <Route path="/jadwalkuliah" element={<Jadwal />} />
          <Route path="/pengajuanstudi" element={<Berhenti />} />
          <Route path="/tambahpengajuan" element={<TambahPengajuan />} />
          <Route path="/updatepengajuan" element={<UpdatePengajuan />} />


          {/* Route Dosen */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/mhsasuh" element={<MahasiswaAsuh />} />
          <Route path="/krsmhs" element={<ListMahasiswa />} />
          <Route path="/viewkrs" element={<DetailKrs />} />
          <Route path="/jadwal" element={<JadwalDosen />} />
          <Route path="/penilaian" element={<ListKelas />} />
          <Route path="/studimhs" element={<ListPengajuan />} />
          <Route path="/detailnilai" element={<InfoNilai />} />
          <Route path="/inputNilai" element={<InputNilai />} />
          <Route path="/editNilai" element={<EditNilai />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
