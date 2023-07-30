import React, { useEffect, useState } from 'react'
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
  FaRegListAlt,
  FaHandHolding,
  FaFileAlt
} from "react-icons/fa"
import {
  SiLevelsdotfyi,
  SiOpslevel,
  SiHomeassistantcommunitystore
} from "react-icons/si"

const Sidebar = () => {
  const location = useLocation()

  const [collap, setCollaps] = useState("")
  const [active, setActive] = useState("")

  useEffect(() => {
    if (location.state != null) {
      setCollaps(location.state.collaps)
    } else {
      setCollaps("")
    }
  })

  return (
    <div className="drawer-side scrollbar-thin scrollbar-thumb-emerald-800 scrollbar-track-gray-100 shadow-md">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <div className="flex gap-1 w-full h-14 py-1 justify-center shadow-md  sticky top-0 z-50 bg-[#2D7F5F]">
        <div className="avatar mt-1 rounded-full drop-shadow-lg h-10 ">
          <div className="w-10 h-10 rounded-full drop-shadow-lg">
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
          {collap == 'induk' ? <details open>
            <summary className='text-white'>DATA INDUK</summary>
            <ul className='gap-2'>
              <li>
                <Link to="/jenjang" state={{ collaps: 'induk', activ: '/jenjang' }} className={`text-white rounded-md text-xs ${location.pathname == '/jenjang' ? 'active' : ''}`}><SiLevelsdotfyi /> <span className='text-xs'>Jenjang Pendidikan</span></Link>
              </li>
              <li>
                <Link to="/fakultas" state={{ collaps: 'induk', activ: '/fakultas' }} className={`text-white rounded-md text-xs ${location.pathname == '/fakultas' ? 'active' : ''}`}><FaUniversity /> <span className='text-xs'>Fakultas</span></Link>
              </li>
              <li className=''>
                <Link to="/prodi" state={{ collaps: 'induk', activ: '/prodi' }} className={`text-white rounded-md text-xs ${location.pathname == '/prodi' ? 'active' : ''}`}><FaBookmark /> <span className='text-xs'>Prodi</span></Link>
              </li>
              <li>
                <Link to="/dosen" state={{ collaps: 'induk', activ: '/dosen' }} className={`text-white rounded-md text-xs ${location.pathname == '/dosen' ? 'active' : ''}`}><FaChalkboardTeacher /> <span className='text-xs'>Dosen</span></Link>
              </li>
              <li>
                <Link to="/mahasiswa" state={{ collaps: 'induk', activ: '/mahasiswa' }} className={`text-white rounded-md text-xs ${location.pathname == '/mahasiswa' ? 'active' : ''}`}><FaUserGraduate /> <span className='text-xs'>Mahasiswa</span></Link>
              </li>
              <li>
                <Link to="/ruang" state={{ collaps: 'induk', activ: '/ruang' }} className={`text-white rounded-md text-xs ${location.pathname == '/ruang' ? 'active' : ''}`}><SiHomeassistantcommunitystore /> <span className='text-xs'>Ruang</span></Link>
              </li>
            </ul>
          </details> :
            <details >
              <summary className='text-white'>DATA INDUK</summary>
              <ul className='gap-2'>
                <li>
                  <Link to="/jenjang" state={{ collaps: 'induk', activ: '/jenjang' }} className={`text-white rounded-md text-xs ${location.pathname == '/jenjang' ? 'active' : ''}`}><SiLevelsdotfyi /> <span className='text-xs'>Jenjang Pendidikan</span></Link>
                </li>
                <li>
                  <Link to="/fakultas" state={{ collaps: 'induk', activ: '/fakultas' }} className={`text-white rounded-md text-xs ${location.pathname == '/fakultas' ? 'active' : ''}`}><FaUniversity /> <span className='text-xs'>Fakultas</span></Link>
                </li>
                <li className=''>
                  <Link to="/prodi" state={{ collaps: 'induk', activ: '/prodi' }} className={`text-white rounded-md text-xs ${location.pathname == '/prodi' ? 'active' : ''}`}><FaBookmark /> <span className='text-xs'>Prodi</span></Link>
                </li>
                <li>
                  <Link to="/dosen" state={{ collaps: 'induk', activ: '/dosen' }} className={`text-white rounded-md text-xs ${location.pathname == '/dosen' ? 'active' : ''}`}><FaChalkboardTeacher /> <span className='text-xs'>Dosen</span></Link>
                </li>
                <li>
                  <Link to="/mahasiswa" state={{ collaps: 'induk', activ: '/mahasiswa' }} className={`text-white rounded-md text-xs ${location.pathname == '/mahasiswa' ? 'active' : ''}`}><FaUserGraduate /> <span className='text-xs'>Mahasiswa</span></Link>
                </li>
                <li>
                  <Link to="/ruang" state={{ collaps: 'induk', activ: '/ruang' }} className={`text-white rounded-md text-xs ${location.pathname == '/ruang' ? 'active' : ''}`}><SiHomeassistantcommunitystore /> <span className='text-xs'>Ruang</span></Link>
                </li>
              </ul>
            </details>
          }

        </li>
        <li>
          {collap == 'kurikulum' ?
            <details open>
              <summary className='text-white'>KURIKULUM</summary>
              <ul className='gap-1'>
                <li>
                  <Link to='/tahun' state={{ collaps: 'kurikulum', activ: '/tahun' }} className={`text-white rounded-md text-xs ${location.pathname == '/tahun' ? 'active' : ''}`}><FaCalendarAlt /> <span className='text-xs'>Tahun Ajaran</span></Link>
                </li>
                <li>
                  <Link to="/semester" state={{ collaps: 'kurikulum', activ: '/semester' }} className={`text-white rounded-md text-xs ${location.pathname == '/semester' ? 'active' : ''}`}><FaStripeS /> <span className='text-xs'>Semester</span></Link>
                </li>
                <li>
                  <Link to="/kategorinilai" state={{ collaps: 'kurikulum', activ: '/kategorinilai' }} className={`text-white rounded-md text-xs ${location.pathname == '/kategorinilai' ? 'active' : ''}`}><FaFileSignature /> <span className='text-xs'>Kategori Nilai</span></Link>
                </li>
              </ul>
            </details>
            :
            <details>
              <summary className='text-white'>KURIKULUM</summary>
              <ul className='gap-1'>
                <li>
                  <Link to='/tahun' state={{ collaps: 'kurikulum', activ: '/tahun' }} className={`text-white rounded-md text-xs ${location.pathname == '/tahun' ? 'active' : ''}`}><FaCalendarAlt /> <span className='text-xs'>Tahun Ajaran</span></Link>
                </li>
                <li>
                  <Link to="/semester" state={{ collaps: 'kurikulum', activ: '/semester' }} className={`text-white rounded-md text-xs ${location.pathname == '/semester' ? 'active' : ''}`}><FaStripeS /> <span className='text-xs'>Semester</span></Link>
                </li>
                <li>
                  <Link to="/kategorinilai" state={{ collaps: 'kurikulum', activ: '/kategorinilai' }} className={`text-white rounded-md text-xs ${location.pathname == '/kategorinilai' ? 'active' : ''}`}><FaFileSignature /> <span className='text-xs'>Kategori Nilai</span></Link>
                </li>
              </ul>
            </details>
          }
        </li>
        <li>
          {collap == 'kuliah' ?
            <details open>
              <summary className='text-white'>PERKULIAHAN</summary>
              <ul className='gap-2'>
                <li>
                  <Link to="/setmhs" state={{ collaps: 'kuliah', activ: '/setmhs' }} className={`text-white rounded-md text-xs ${location.pathname == '/setmhs' ? 'active' : ''}`}><FaNetworkWired /> <span className='text-xs'>Set MHS Persemester</span></Link>
                </li>
                <li>
                  <Link to="/pembimbingakademik" state={{ collaps: 'kuliah', activ: '/pembimbingakademik' }} className={`text-white rounded-md text-xs ${location.pathname == '/pembimbingakademik' ? 'active' : ''}`}><FaHandHolding /><span className='text-xs'>Pembimbing Akadmik</span></Link>
                </li>
                <li>
                  <Link to="/studimhs" state={{ collaps: 'kuliah', activ: '/studimhs' }} className={`text-white rounded-md text-xs ${location.pathname == '/studimhs' ? 'active' : ''}`}><FaFileAlt /><span className='text-xs'>Studi Mahasiswa</span></Link>
                </li>
                <li>
                  <Link to="/pengajuanstudi" state={{ collaps: 'kuliah', activ: '/pengajuanstudi' }} className={`text-white rounded-md text-xs ${location.pathname == '/pengajuanstudi' ? 'active' : ''}`}><FaFileAlt /><span className='text-xs'>Pengajuan Studi</span></Link>
                </li>
                <li>
                  <Link to="/matakuliah" state={{ collaps: 'kuliah', activ: '/matakuliah' }} className={`text-white rounded-md text-xs ${location.pathname == '/matakuliah' ? 'active' : ''}`}><FaBook /> <span className='text-xs'>Mata Kuliah</span></Link>
                </li>
                <li>
                  <Link to='/sebaran' state={{ collaps: 'kuliah', activ: '/sebaran' }} className={`text-white rounded-md text-xs ${location.pathname == '/sebaran' ? 'active' : ''}`}><FaTh /> <span className='text-xs'>Sebaran Mata Kuliah</span></Link>
                </li>
                <li>
                  <Link to="/krs" state={{ collaps: 'kuliah', activ: '/krs' }} className={`text-white rounded-md text-xs ${location.pathname == '/krs' ? 'active' : ''}`}><FaTasks /> <span className='text-xs'>Kartu Rencana Studi</span></Link>
                </li>
                <li>
                  <Link to="/kelas" state={{ collaps: 'kuliah' }} className={`text-white rounded-md text-xs ${location.pathname == '/kelas' ? 'active' : ''}`}><SiOpslevel /> <span className='text-xs'>Kelas Kuliah</span></Link>
                </li>
                <li>
                  <Link to="/jadwalkuliah" state={{ collaps: 'kuliah' }} className={`text-white rounded-md text-xs ${location.pathname == '/jadwalkuliah' ? 'active' : ''}`}><FaBusinessTime /> <span className='text-xs'>Jadwal Kuliah</span></Link>
                </li>
                <li>
                  <Link to="/penilaian" state={{ collaps: 'kuliah' }} className={`text-white rounded-md text-xs ${location.pathname == '/penilaian' ? 'active' : ''}`}><FaFileSignature /> <span className='text-xs'>Penilaian Mahasiswa</span></Link>
                </li>
                <li>
                  <Link to="/khs" state={{ collaps: 'kuliah' }} className={`text-white rounded-md text-xs ${location.pathname == '/khs' ? 'active' : ''} even:bg-[#287155]`}><FaAddressBook /> <span className='text-xs'>Kartu Hasil Studi</span></Link>
                </li>
              </ul>
            </details> :
            <details>
              <summary className='text-white'>PERKULIAHAN</summary>
              <ul className='gap-2'>
                <li>
                  <Link to="/setmhs" state={{ collaps: 'kuliah' }} className={`text-white rounded-md text-xs ${location.pathname == '/setmhs' ? 'active' : ''}`}><FaNetworkWired /> <span className='text-xs'>Set MHS Persemester</span></Link>
                </li>
                <li>
                  <Link to="/pembimbingakademik" state={{ collaps: 'kuliah' }} className={`text-white rounded-md text-xs ${location.pathname == '/pembimbingakademik' ? 'active' : ''}`}><FaHandHolding /><span className='text-xs'>Pembimbing Akadmik</span></Link>
                </li>
                <li>
                  <Link to="/studimhs" state={{ collaps: 'kuliah' }} className={`text-white rounded-md text-xs ${location.pathname == '/studimhs' ? 'active' : ''}`}><FaFileAlt /><span className='text-xs'>Studi Mahasiswa</span></Link>
                </li>
                <li>
                  <Link to="/pengajuanstudi" state={{ collaps: 'kuliah' }} className={`text-white rounded-md text-xs ${location.pathname == '/pengajuanstudi' ? 'active' : ''}`}><FaFileAlt /><span className='text-xs'>Pengajuan Studi</span></Link>
                </li>
                <li>
                  <Link to="/matakuliah" state={{ collaps: 'kuliah' }} className={`text-white rounded-md text-xs ${location.pathname == '/matakuliah' ? 'active' : ''}`}><FaBook /> <span className='text-xs'>Mata Kuliah</span></Link>
                </li>
                <li>
                  <Link to='/sebaran' state={{ collaps: 'kuliah' }} className={`text-white rounded-md text-xs ${location.pathname == '/sebaran' ? 'active' : ''}`}><FaTh /> <span className='text-xs'>Sebaran Mata Kuliah</span></Link>
                </li>
                <li>
                  <Link to="/krs" state={{ collaps: 'kuliah' }} className={`text-white rounded-md text-xs ${location.pathname == '/krs' ? 'active' : ''}`}><FaTasks /> <span className='text-xs'>Kartu Rencana Studi</span></Link>
                </li>
                <li>
                  <Link to="/kelas" state={{ collaps: 'kuliah' }} className={`text-white rounded-md text-xs ${location.pathname == '/kelas' ? 'active' : ''}`}><SiOpslevel /> <span className='text-xs'>Kelas Kuliah</span></Link>
                </li>
                <li>
                  <Link to="/jadwalkuliah" state={{ collaps: 'kuliah' }} className={`text-white rounded-md text-xs ${location.pathname == '/jadwalkuliah' ? 'active' : ''}`}><FaBusinessTime /> <span className='text-xs'>Jadwal Kuliah</span></Link>
                </li>
                <li>
                  <Link to="/penilaian" state={{ collaps: 'kuliah' }} className={`text-white rounded-md text-xs ${location.pathname == '/penilaian' ? 'active' : ''}`}><FaFileSignature /> <span className='text-xs'>Penilaian Mahasiswa</span></Link>
                </li>
                <li>
                  <Link to="/khs" state={{ collaps: 'kuliah' }} className={`text-white rounded-md text-xs ${location.pathname == '/khs' ? 'active' : ''} even:bg-[#287155]`}><FaAddressBook /> <span className='text-xs'>Kartu Hasil Studi</span></Link>
                </li>
              </ul>
            </details>
          }
        </li>
        <li>
          {collap == 'user' ?
            <details open>
              <summary className='text-white'>PENGGUNA</summary>
              <ul className='gap-2'>
                <li>
                  <Link to="/users" state={{ collaps: 'user' }} className={`text-white rounded-md text-xs ${location.pathname == '/users' ? 'active' : ''}`}><FaUsers /> <span className='text-xs'>Users</span></Link>
                </li>
              </ul>
            </details> :
            <details>
              <summary className='text-white'>PENGGUNA</summary>
              <ul className='gap-2'>
                <li>
                  <Link to="/users" state={{ collaps: 'user' }} className={`text-white rounded-md text-xs ${location.pathname == '/users' ? 'active' : ''}`}><FaUsers /> <span className='text-xs'>Users</span></Link>
                </li>
              </ul>
            </details>
          }
        </li>
      </ul>
    </div>
  )
}

export default Sidebar