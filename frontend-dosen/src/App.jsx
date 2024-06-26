import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Chat from "./pages/chat/Chat"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import PedomanList from "./pages/pedoman/PedomanList"
import DetailPedoman from "./pages/pedoman/DetailPedoman"

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
import TugasList from "./pages/mhs/tugas/TugasList"
import TugasDetail from "./pages/mhs/tugas/TugasDetail"

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
import ListTugas from "./pages/dosen/tugas/ListTugas"
import Deskripsi from "./pages/dosen/tugas/Deskripsi"
import DetailTugas from "./pages/dosen/tugas/DetailTugas"
import Tugas from "./pages/dosen/jadwalDosen/Tugas"
import PilihMahasiswa from "./pages/dosen/jadwalDosen/PilihMahasiswa"
import ListMakul from "./pages/dosen/presensi/ListMakul"
import ListPertemuan from "./pages/dosen/presensi/ListPertemuan"
import PresensiMhs from "./pages/dosen/presensi/PresensiMhs"
import ValidasiMhs from "./pages/dosen/presensi/ValidasiMhs"
import RekapAbsen from "./pages/dosen/presensi/RekapAbsen"
import DetailRekap from "./pages/dosen/presensi/DetailRekap"
import MakulList from "./pages/dosen/jurnal/MakulList"
import ListJurnal from "./pages/dosen/jurnal/ListJurnal"
import DetailKehadiran from "./pages/dosen/presensi/DetailKehadiran"

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
          <Route path="/listPedoman" element={<PedomanList />} />
          <Route path="/detailpedoman" element={<DetailPedoman />} />


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
          <Route path="/listtugas" element={<TugasList />} />
          <Route path="/tugasdetail" element={<TugasDetail />} />


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
          <Route path="/tugas" element={<ListTugas />} />
          <Route path="/deskripsi" element={<Deskripsi />} />
          <Route path="/detailTugas" element={<DetailTugas />} />
          <Route path="/settugas" element={<Tugas />} />
          <Route path="/pilihmhs" element={<PilihMahasiswa />} />
          <Route path="/presensi" element={<ListMakul />} />
          <Route path="/presensi/pertemuan" element={<ListPertemuan />} />
          <Route path="/presensi/mahasiswa" element={<PresensiMhs />} />
          <Route path="/presensi/validasi" element={<ValidasiMhs />} />
          <Route path="/presensi/rekap" element={<RekapAbsen />} />
          <Route path="/presensi/detailrekap" element={<DetailRekap />} />
          <Route path="/presensi/kehadiran" element={<DetailKehadiran />} />
          <Route path="/jurnal" element={<MakulList />} />
          <Route path="/jurnal/all" element={<ListJurnal />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
