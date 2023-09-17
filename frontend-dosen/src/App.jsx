import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Profil from "./pages/profil/Profil"
import KRS from "./pages/krs/KRS"
import Jadwal from "./pages/jadwal/Jadwal"
import Chat from "./pages/chat/Chat"
import ListPengumuman from "./pages/pengumuman/ListPengumuman"
import KHS from "./pages/khs/KHS"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/karturencanastudi" element={<KRS />} />
          <Route path="/kartuhasilstudi" element={<KHS />} />
          <Route path="/jadwalkuliah" element={<Jadwal />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/pengumuman" element={<ListPengumuman />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
