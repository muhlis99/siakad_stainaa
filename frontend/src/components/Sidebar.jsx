import React from 'react'
import stainaa from "../assets/img/stainaa.png"
import { Link, useLocation } from "react-router-dom"
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
  FaTh,
  FaNetworkWired,
  FaRegListAlt
} from "react-icons/fa"
import {
  SiLevelsdotfyi,
  SiOpslevel,
  SiHomeassistantcommunitystore
} from "react-icons/si"

const Sidebar = () => {
  const location = useLocation()

  return (
    <div className="drawer-side scrollbar-thin scrollbar-thumb-emerald-800 scrollbar-track-gray-100 shadow-md">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <div className="flex gap-1 w-full h-14 py-1 justify-center shadow-md  sticky top-0 z-50 bg-[#2D7F5F]">
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
      <ul className="menu w-60 min-h-screen gap-2 bg-[#2D7F5F]">
        <li><Link to="/dashboard" className={`text-white rounded-md text-xs ${location.pathname == '/dashboard' ? 'active' : ''}`}><FaHome /> <span className='text-xs'>Dashboard</span></Link></li>
        <li>
          <details >
            <summary className='text-white'>DATA INDUK</summary>
            <ul className='gap-2'>
              <li>
                <Link to="/jenjang" className={`text-white rounded-md text-xs ${location.pathname == '/jenjang' ? 'active' : ''}`}><SiLevelsdotfyi /> <span className='text-xs'>Jenjang Pendidikan</span></Link>
              </li>
              <li>
                <Link to="/fakultas" className={`text-white rounded-md text-xs ${location.pathname == '/fakultas' ? 'active' : ''}`}><FaUniversity /> <span className='text-xs'>Fakultas</span></Link>
              </li>
              <li className=''>
                <Link to="/prodi" className={`text-white rounded-md text-xs ${location.pathname == '/prodi' ? 'active' : ''}`}><FaBookmark /> <span className='text-xs'>Prodi</span></Link>
              </li>
              <li>
                <Link to="/dosen" className={`text-white rounded-md text-xs ${location.pathname == '/dosen' ? 'active' : ''}`}><FaChalkboardTeacher /> <span className='text-xs'>Dosen</span></Link>
              </li>
              <li>
                <Link to="/mahasiswa" className={`text-white rounded-md text-xs ${location.pathname == '/mahasiswa' ? 'active' : ''}`}><FaUserGraduate /> <span className='text-xs'>Mahasiswa</span></Link>
              </li>
              <li>
                <Link to="/ruang" className={`text-white rounded-md text-xs ${location.pathname == '/ruang' ? 'active' : ''}`}><SiHomeassistantcommunitystore /> <span className='text-xs'>Ruang</span></Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary className='text-white'>KURIKULUM</summary>
            <ul className='gap-1'>
              <li>
                <Link to='/tahun' className={`text-white rounded-md text-xs ${location.pathname == '/tahun' ? 'active' : ''}`}><FaCalendarAlt /> <span className='text-xs'>Tahun Ajaran</span></Link>
              </li>
              <li>
                <Link to="/semester" className={`text-white rounded-md text-xs ${location.pathname == '/semester' ? 'active' : ''}`}><FaStripeS /> <span className='text-xs'>Semester</span></Link>
              </li>
              <li>
                <Link to="/kategorinilai" className={`text-white rounded-md text-xs ${location.pathname == '/kategorinilai' ? 'active' : ''}`}><FaFileSignature /> <span className='text-xs'>Kategori Nilai</span></Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary className='text-white'>PERKULIAHAN</summary>
            <ul className='gap-2'>
              <li>
                <Link to="/setmhs" className={`text-white rounded-md text-xs ${location.pathname == '/setmhs' ? 'active' : ''}`}><FaNetworkWired /> <span className='text-xs'>Set MHS Persemester</span></Link>
              </li>
              <li>
                <Link to="/pembimbingakademik" className='rounded-md text-xs text-white'><FaNetworkWired /><span className='text-xs'>Pembimbing Akadmik</span></Link>
              </li>
              <li>
                <Link to="/pengajuanstudi" className='rounded-md text-xs text-white'><FaNetworkWired /><span className='text-xs'>Pengajuan Studi</span></Link>
              </li>
              <li>
                <Link to="/matakuliah" className={`text-white rounded-md text-xs ${location.pathname == '/matakuliah' ? 'active' : ''}`}><FaBook /> <span className='text-xs'>Mata Kuliah</span></Link>
              </li>
              <li>
                <Link to='/sebaran' className={`text-white rounded-md text-xs ${location.pathname == '/sebaran' ? 'active' : ''}`}><FaTh /> <span className='text-xs'>Sebaran Mata Kuliah</span></Link>
              </li>
              <li>
                <Link to="/krs" className={`text-white rounded-md text-xs ${location.pathname == '/krs' ? 'active' : ''}`}><FaTasks /> <span className='text-xs'>Kartu Rencana Studi</span></Link>
              </li>
              <li>
                <Link to="/kelas" className={`text-white rounded-md text-xs ${location.pathname == '/kelas' ? 'active' : ''}`}><SiOpslevel /> <span className='text-xs'>Kelas Kuliah</span></Link>
              </li>
              <li>
                <Link to="/jadwalkuliah" className={`text-white rounded-md text-xs ${location.pathname == '/jadwalkuliah' ? 'active' : ''}`}><FaBusinessTime /> <span className='text-xs'>Jadwal Kuliah</span></Link>
              </li>
              <li>
                <Link to="/penilaian" className={`text-white rounded-md text-xs ${location.pathname == '/penilaian' ? 'active' : ''}`}><FaFileSignature /> <span className='text-xs'>Penilaian Mahasiswa</span></Link>
              </li>
              <li>
                <Link to="/khs" className={`text-white rounded-md text-xs ${location.pathname == '/khs' ? 'active' : ''} even:bg-[#287155]`}><FaAddressBook /> <span className='text-xs'>Kartu Hasil Studi</span></Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary className='text-white'>PENGGUNA</summary>
            <ul className='gap-2'>
              <li>
                <Link to="/users" className={`text-white rounded-md text-xs ${location.pathname == '/users' ? 'active' : ''}`}><FaUsers /> <span className='text-xs'>Users</span></Link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar