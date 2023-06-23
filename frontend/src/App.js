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
import AddRuang from "./pages/ruang/AddRuang"
import EditRuang from "./pages/ruang/EditRuang"
import Kelas from "./pages/kelas/Kelas"
import AddKelas from "./pages/kelas/AddKelas"
import EditKelas from "./pages/kelas/EditKelas"
import Tahun from "./pages/tahunAjaran/Tahun"
import Semester from "./pages/semester/Semester"
import KategoriNilai from "./pages/kategoriNilai/KategoriNilai"
import PlotingKelas from "./pages/plotingKelas/PlotingKelas"
import AddPloting from "./pages/plotingKelas/AddPloting"
import MataKuliah from "./pages/mataKuliah/MataKuliah"
import AddMataKuliah from "./pages/mataKuliah/AddMataKuliah"
import EditMataKuliah from "./pages/mataKuliah/EditMataKuliah"
import Sebaran from "./pages/sebaranMakul/Sebaran"
import KrsList from "./pages/krs/KrsList"

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
          <Route path="/mahasiswa/form1/:stat/:idMhs" element={<Form1 />} />
          <Route path="/mahasiswa/form2/:stat/:idMhs" element={<Form2 />} />
          <Route path="/mahasiswa/form3/:stat/:idMhs" element={<Form3 />} />
          <Route path="/mahasiswa/form4/:stat/:idMhs" element={<Form4 />} />
          <Route path="/mahasiswa/upload/:stat/:idMhs" element={<Upload />} />
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
          <Route path="/ruang/add" element={<AddRuang />} />
          <Route path="/ruang/edit/:idRng" element={<EditRuang />} />
          <Route path="/kelas" element={<Kelas />} />
          <Route path="/kelas/add" element={<AddKelas />} />
          <Route path="/kelas/edit/:idKls" element={<EditKelas />} />
          <Route path="/tahun" element={<Tahun />} />
          <Route path="/semester" element={<Semester />} />
          <Route path="/kategorinilai" element={<KategoriNilai />} />
          <Route path="/ploting" element={<PlotingKelas />} />
          <Route path="/ploting/add" element={<AddPloting />} />
          <Route path="/matakuliah" element={<MataKuliah />} />
          <Route path="/matakuliah/add" element={<AddMataKuliah />} />
          <Route path="/matakuliah/edit/:idMakul" element={<EditMataKuliah />} />
          <Route path="/sebaran" element={<Sebaran />} />
          <Route path="/krs" element={<KrsList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
