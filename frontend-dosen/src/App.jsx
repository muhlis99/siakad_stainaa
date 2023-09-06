import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Chat from "./pages/chat/Chat"
import Login from "./pages/Login"
import InputNilai from "./pages/khs/InputNilai"
import Table from "./pages/khs/Table"
import Input from "./pages/khs/Input"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/inputnilai" element={<InputNilai />} />
          <Route path="/table" element={<Table />} />
          <Route path="/input" element={<Input />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
