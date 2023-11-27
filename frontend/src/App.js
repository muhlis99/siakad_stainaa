import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Welcome from "./pages/Welcome"
import Login from "./pages/Login"
import Forgot from "./pages/Forgot"
import VerifiCode from "./pages/VerifiCode"
import ChangePass from "./pages/user/ChangePass"
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
import PrintMhs from "./components/mahasiswa/PrintMhs"
import Dosen from "./pages/dosen/Dosen"
import FormDs1 from "./pages/dosen/FormDs1"
import FormDs2 from "./pages/dosen/FormDs2"
import Upload1 from "./pages/dosen/Upload1"
import Upload2 from "./pages/dosen/Upload2"
import DetailDsn from "./pages/dosen/DetailDsn"
import PrintDosen from "./components/dosen/PrintDosen"
import Ruang from "./pages/ruang/Ruang"
import Tahun from "./pages/tahunAjaran/Tahun"
import Semester from "./pages/semester/Semester"
import KategoriNilai from "./pages/kategoriNilai/KategoriNilai"
// import PlotingKelas from "./pages/plotingKelas/PlotingKelas"
// import AddPloting from "./pages/plotingKelas/AddPloting"
import MataKuliah from "./pages/mataKuliah/MataKuliah"
import AddMataKuliah from "./pages/mataKuliah/AddMataKuliah"
import EditMataKuliah from "./pages/mataKuliah/EditMataKuliah"
import Sebaran from "./pages/sebaranMakul/Sebaran"
import KrsList from "./pages/krs/KrsList"
import Kelas from "./pages/kelas/Kelas"
import DetailKelas from "./pages/kelas/DetailKelas"
import Jadwal from "./pages/jadwalKuliah/Jadwal"
import AturJadwal from "./pages/jadwalKuliah/AturJadwal"
import DetailJadwalKuliah from "./pages/jadwalKuliah/DetailJadwalKuliah"
import DosenPgjr from "./pages/jadwalKuliah/DosenPgjr"
import Pertemuan from "./pages/jadwalKuliah/Pertemuan"
import Penilaian from "./pages/penilaian/Penilaian"
import InputNilai from "./pages/penilaian/InputNilai"
import UpdateNilai from "./pages/penilaian/UpdateNilai"
import Detail2 from "./pages/penilaian/Detail"
import Persemester from "./pages/mhsPersemester/Persemester"
import Khs from "./pages/khs/Khs"
import View from "./pages/khs/View"
import Users from "./pages/user/Users"
import ListStudiMhs from "./pages/studiMahasiswa/ListStudiMhs"
import StudiMahasiswa from "./pages/studiMahasiswa/StudiMahasiswa"
import PengajuanStudi from "./pages/studiMahasiswa/PengajuanStudi"
import SetPengajuanStudi from "./pages/studiMahasiswa/SetPengajuanStudi"
import Pembimbing from "./pages/pembimbing/Pembimbing"
import SetPembimbingAkademik from "./pages/pembimbing/SetPembimbingAkademik"
import Perpembimbing from "./pages/pembimbing/Perpembimbing"
import EditPembimbing from "./pages/pembimbing/EditPembimbing"
import DetailPembimbing from "./pages/pembimbing/DetailPembimbing"
import Pengumuman from "./pages/pengumuman/Pengumuman"


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/verification" element={<VerifiCode />} />
          <Route path="/changepass" element={<ChangePass />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jenjang" element={<Jenjang />} />
          <Route path="/fakultas" element={<Fakultas />} />
          <Route path="/prodi" element={<Prodi />} />
          <Route path="/mahasiswa" element={<Mahasiswa />} />
          <Route path="/mahasiswa/form1" element={<Form1 />} />
          <Route path="/mahasiswa/form2" element={<Form2 />} />
          <Route path="/mahasiswa/form3" element={<Form3 />} />
          <Route path="/mahasiswa/form4" element={<Form4 />} />
          <Route path="/mahasiswa/upload/:idMhs" element={<Upload />} />
          <Route path="/mahasiswa/detail/:idMhs" element={<Detail />} />
          <Route path="/mahasiswa/print/:idMhs" element={<PrintMhs />} />
          <Route path="/dosen" element={<Dosen />} />
          <Route path="/dosen/form1/:stat/:idDsn" element={<FormDs1 />} />
          <Route path="/dosen/form2/:stat/:idDsn" element={<FormDs2 />} />
          <Route path="/dosen/upload1/:idDsn" element={<Upload1 />} />
          <Route path="/dosen/upload2/:idDsn" element={<Upload2 />} />
          <Route path="/dosen/detail/:idDsn" element={<DetailDsn />} />
          <Route path="/dosen/print/:idDsn" element={<PrintDosen />} />
          <Route path="/ruang" element={<Ruang />} />
          <Route path="/tahun" element={<Tahun />} />
          <Route path="/semester" element={<Semester />} />
          <Route path="/kategorinilai" element={<KategoriNilai />} />
          {/* <Route path="/ploting" element={<PlotingKelas />} />
          <Route path="/ploting/add" element={<AddPloting />} /> */}
          <Route path="/matakuliah" element={<MataKuliah />} />
          <Route path="/matakuliah/add" element={<AddMataKuliah />} />
          <Route path="/matakuliah/edit/:idMakul" element={<EditMataKuliah />} />
          <Route path="/sebaran" element={<Sebaran />} />
          <Route path="/krs" element={<KrsList />} />
          <Route path="/kelas" element={<Kelas />} />
          <Route path="/kelas/detail/:kodeKls" element={<DetailKelas />} />
          <Route path="/jadwalkuliah" element={<Jadwal />} />
          <Route path="/aturjadwal" element={<AturJadwal />} />
          <Route path="/detailjadwal" element={<DetailJadwalKuliah />} />
          <Route path="/setDsn" element={<DosenPgjr />} />
          <Route path="/setpertemuan" element={<Pertemuan />} />
          <Route path="/penilaian" element={<Penilaian />} />
          <Route path="/inputnilai" element={<InputNilai />} />
          <Route path="/updatenilai" element={<UpdateNilai />} />
          <Route path="/detailnilai" element={<Detail2 />} />
          <Route path="/setmhs" element={<Persemester />} />
          <Route path="/khs" element={<Khs />} />
          <Route path="/view/:nim/:kodeFk/:kodeJnjg/:kodeProdi/:kodeSmt/:kodeThn" element={<View />} />
          <Route path="/users" element={<Users />} />
          <Route path="/studimhs" element={<ListStudiMhs />} />
          <Route path="/studimhs/add" element={<StudiMahasiswa />} />
          <Route path="/pengajuanstudi" element={<PengajuanStudi />} />
          <Route path="/setpengajuan" element={<SetPengajuanStudi />} />
          <Route path="/pembimbingakademik" element={<Pembimbing />} />
          <Route path="/addpembimbing" element={<SetPembimbingAkademik />} />
          <Route path="/setpembimbingakademik" element={<Perpembimbing />} />
          <Route path="/editpembimbingakademik" element={<EditPembimbing />} />
          <Route path="/detailpembimbingakademik" element={<DetailPembimbing />} />
          <Route path="/pengumuman" element={<Pengumuman />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
