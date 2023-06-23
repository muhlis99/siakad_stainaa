import React from 'react'
import stainaa from "../assets/img/stainaa.png"
import { Link } from "react-router-dom"
import {
  FaHome,
  FaUniversity,
  FaBookmark,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaStripeS,
  FaBook,
  FaFileSignature,
  FaTasks,
  FaBusinessTime,
  FaBuromobelexperte,
  FaUsers,
  FaAddressBook,
  FaTh
} from "react-icons/fa"
import {
  SiLevelsdotfyi,
  SiOpslevel,
  SiHomeassistantcommunitystore
} from "react-icons/si"

const Sidebar = () => {
  return (
    <div className="drawer-side scrollbar-thin scrollbar-thumb-emerald-800 scrollbar-track-gray-100">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <ul className="menu w-60 bg-[#2D7F5F]">
        <div className="flex gap-1 w-full h-14 mb-2 py-1 justify-center shadow-md  sticky top-0 z-50 bg-[#2D7F5F]">
          <div className="avatar mt-1 rounded-full shadow-lg h-10 ">
            <div className="w-10 h-10 rounded-full">
              <img src={stainaa} />
            </div>
          </div>
          <div className="text-center text-white">
            <Link to="/dashboard">
              <p className='text-xl font-bold mt-1'>SIAKAD</p>
              <p className='text-[8px]'>STAI NURUL ABROR AL-ROBBANIYIN</p>
            </Link>
          </div>
        </div>
        <li><Link to="/dashboard" className='text-white rounded-md'><FaHome /> <span className='text-sm'>Dashboard</span></Link></li>
        <div>
          <div className="collapse collapse-arrow bg-[#2D7F5F] hover:bg-[#287155] mt-1">
            <input type="checkbox" className='p-0 min-h-0' />
            <div className="collapse-title p-2 min-h-0 text-white">
              <Link className='text-sm'><span>KURIKULUM</span></Link>
            </div>
            <div className="collapse-content grid gap-1 bg-[#2D7F5F] px-0">
              <Link to='/tahun' className='text-white flex gap-2 mt-2 hover:bg-[#287155] px-4 py-2'><FaCalendarAlt /> <span className='text-sm'>Tahun Ajaran</span></Link>
              <Link to="/semester" className='text-white flex gap-2 hover:bg-[#287155] px-4 py-2'><FaStripeS /> <span className='text-sm'>Semester</span></Link>
              <Link to="/kategorinilai" className='text-white flex gap-2 hover:bg-[#287155] px-4 py-2'><FaFileSignature /> <span className='text-sm'>Kategori Nilai</span></Link>
            </div>
          </div>
        </div>
        <div>
          <div className="collapse collapse-arrow bg-[#2D7F5F] hover:bg-[#287155] mt-1">
            <input type="checkbox" className='p-0 min-h-0' />
            <div className="collapse-title p-2 min-h-0 text-white">
              <Link className='text-sm'><span>PERKULIAHAN</span></Link>
            </div>
            <div className="collapse-content grid gap-1 bg-[#2D7F5F] px-0">
              <Link to="/matakuliah" className='text-white flex gap-2 mt-2 hover:bg-[#287155] px-4 py-2'><FaBook /> <span className='text-sm'>Mata Kuliah</span></Link>
              <Link to='/sebaran' className='text-white flex gap-2 hover:bg-[#287155] px-4 py-2'><FaTh /> <span className='text-sm'>Sebaran Mata Kuliah</span></Link>
              <Link to="/krs" className='text-white flex gap-2 hover:bg-[#287155] px-4 py-2'><FaTasks /> <span className='text-sm'>Kartu Rencana Studi</span></Link>
              <Link to="/kelas" className='text-white flex gap-2 hover:bg-[#287155] px-4 py-2'><SiOpslevel /> <span className='text-sm'>Kelas Kuliah</span></Link>
              <Link className='text-white flex gap-2 hover:bg-[#287155] px-4 py-2'><FaBusinessTime /> <span className='text-sm'>Penjadwalan</span></Link>
              {/* <Link to="/ploting" className='text-white flex gap-2 hover:bg-[#287155] px-4 py-2'><FaBuromobelexperte /> <span className='text-sm'>Ploting Kelas</span></Link> */}
              <Link className='text-white flex gap-2 hover:bg-[#287155] px-4 py-2'><FaAddressBook /> <span className='text-sm'>Kartu Hasil Studi</span></Link>
            </div>
          </div>
        </div>
        <div>
          <div className="collapse collapse-arrow bg-[#2D7F5F] hover:bg-[#287155] mt-1">
            <input type="checkbox" className='p-0 min-h-0' />
            <div className="collapse-title p-2 min-h-0 text-white">
              <Link className='text-sm flex gap-2'><span>DATA PELENGKAP</span></Link>
            </div>
            <div className="collapse-content grid gap-1 bg-[#2D7F5F] px-0">
              <Link to="/jenjang" className='text-white flex gap-2 mt-2 hover:bg-[#287155] px-4 py-2'><SiLevelsdotfyi /> <span className='text-sm'>Jenjang Pendidikan</span></Link>
              <Link to="/fakultas" className='text-white flex gap-2 hover:bg-[#287155] px-4 py-2'><FaUniversity /> <span className='text-sm'>Fakultas</span></Link>
              <Link to="/prodi" className='text-white flex gap-2 hover:bg-[#287155] px-4 py-2'><FaBookmark /> <span className='text-sm'>Prodi</span></Link>
              <Link to="/dosen" className='text-white flex gap-2 hover:bg-[#287155] px-4 py-2'><FaChalkboardTeacher /> <span className='text-sm'>Dosen</span></Link>
              <Link to="/mahasiswa" className='text-white flex gap-2 hover:bg-[#287155] px-4 py-2'><FaUserGraduate /> <span className='text-sm'>Mahasiswa</span></Link>
              <Link to="/ruang" className='text-white flex gap-2 hover:bg-[#287155] px-4 py-2'><SiHomeassistantcommunitystore /> <span className='text-sm'>Ruang</span></Link>
            </div>
          </div>
        </div>
        <div>
          <div className="collapse collapse-arrow bg-[#2D7F5F] hover:bg-[#287155] mt-1">
            <input type="checkbox" className='p-0 min-h-0' />
            <div className="collapse-title p-2 min-h-0 text-white">
              <Link className='text-sm flex gap-2'><span>PENGGUNA</span></Link>
            </div>
            <div className="collapse-content grid gap-1 bg-[#2D7F5F] px-0">
              <Link className='text-white flex gap-2 mt-2 hover:bg-[#287155] px-4 py-2'><FaUsers /> <span className='text-sm'>Users</span></Link>
            </div>
          </div>
        </div>
      </ul>
    </div>
  )
}

export default Sidebar