import React, { useEffect, useState } from 'react'
import stainaa from "../assets/img/stainaa.png"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
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
  FaFileAlt,
  FaStackOverflow,
  FaCopy,
  FaDatabase
} from "react-icons/fa"
import {
  SiLevelsdotfyi,
  SiOpslevel,
  SiHomeassistantcommunitystore,
  SiFoursquarecityguide
} from "react-icons/si"
import { RiRfidFill } from "react-icons/ri"
import { FaChalkboardUser } from "react-icons/fa6"

const Sidebar = () => {
  const location = useLocation()
  const { user } = useSelector((state) => state.auth)
  const [collap, setCollaps] = useState("")
  const [active, setActive] = useState("")

  useEffect(() => {
    if (location.state != null) {
      setCollaps(location.state.collaps)
      setActive(location.state.activ)
    } else {
      setCollaps("")
      setActive("")
    }
  })

  return (
    <div className="drawer-side scrollbar-thin scrollbar-thumb-emerald-800 scrollbar-track-gray-100 shadow-md">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <div className="flex gap-1 w-full h-14 py-1 justify-center shadow-lg  sticky top-0 z-50 bg-[#2D7F5F]">
        <div className="avatar mt-1 rounded-full drop-shadow-lg h-10 ">
          <div className="w-10 h-10 rounded-full drop-shadow-lg">
            <img src={stainaa} />
          </div>
        </div>
        <div className="text-center text-[#F5F5F5]">
          <Link to="/dashboard">
            <p className='text-xl font-bold mt-1'>SIAKAD</p>
            <p className='text-[8px]'>STAI NURUL ABROR AL-ROBBANIYIN</p>
          </Link>
        </div>
      </div>
      <ul className="menu w-60 min-h-screen gap-2 bg-[#2D7F5F]">
        <li><Link to="/dashboard" className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/dashboard' ? 'active' : ''}`}><FaHome /> <span className='text-sm'>Dashboard</span></Link></li>
        <li>
          {collap == 'induk' ? <details open>
            <summary className='text-[#F5F5F5]'><FaDatabase />Data Induk</summary>
            <ul className='gap-2'>
              <li>
                <Link to="/jenjang" state={{ collaps: 'induk', activ: '/jenjang' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/jenjang' ? 'active' : ''}`}><SiLevelsdotfyi /> <span className='text-sm'>Jenjang Pendidikan</span></Link>
              </li>
              <li>
                <Link to="/fakultas" state={{ collaps: 'induk', activ: '/fakultas' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/fakultas' ? 'active' : ''}`}><FaUniversity /> <span className='text-sm'>Fakultas</span></Link>
              </li>
              <li className=''>
                <Link to="/prodi" state={{ collaps: 'induk', activ: '/prodi' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/prodi' ? 'active' : ''}`}><FaBookmark /> <span className='text-sm'>Prodi</span></Link>
              </li>
              <li>
                <Link to='/tahun' state={{ collaps: 'induk', activ: '/tahun' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/tahun' ? 'active' : ''}`}><FaCalendarAlt /> <span className='text-sm'>Tahun Ajaran</span></Link>
              </li>
              <li>
                <Link to="/semester" state={{ collaps: 'induk', activ: '/semester' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/semester' ? 'active' : ''}`}><FaStripeS /> <span className='text-sm'>Semester</span></Link>
              </li>
              <li>
                <Link to="/dosen" state={{ collaps: 'induk', activ: '/dosen' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/dosen' || active == '/dosen' ? 'active' : ''}`}><FaChalkboardTeacher /> <span className='text-sm'>Dosen</span></Link>
              </li>
              <li>
                <Link to="/mahasiswa" state={{ collaps: 'induk', activ: '/mahasiswa' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/mahasiswa' || active == '/mahasiswa' ? 'active' : ''}`}><FaUserGraduate /> <span className='text-sm'>Mahasiswa</span></Link>
              </li>
              <li>
                <Link to="/ruang" state={{ collaps: 'induk', activ: '/ruang' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/ruang' ? 'active' : ''}`}><SiHomeassistantcommunitystore /> <span className='text-sm'>Ruang</span></Link>
              </li>
            </ul>
          </details> :
            <details >
              <summary className='text-[#F5F5F5]'><FaDatabase />Data Induk</summary>
              <ul className='gap-2'>
                <li>
                  <Link to="/jenjang" state={{ collaps: 'induk', activ: '/jenjang' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/jenjang' ? 'active' : ''}`}><SiLevelsdotfyi /> <span className='text-sm'>Jenjang Pendidikan</span></Link>
                </li>
                <li>
                  <Link to="/fakultas" state={{ collaps: 'induk', activ: '/fakultas' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/fakultas' ? 'active' : ''}`}><FaUniversity /> <span className='text-sm'>Fakultas</span></Link>
                </li>
                <li className=''>
                  <Link to="/prodi" state={{ collaps: 'induk', activ: '/prodi' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/prodi' ? 'active' : ''}`}><FaBookmark /> <span className='text-sm'>Prodi</span></Link>
                </li>
                <li>
                  <Link to='/tahun' state={{ collaps: 'induk', activ: '/tahun' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/tahun' ? 'active' : ''}`}><FaCalendarAlt /> <span className='text-sm'>Tahun Ajaran</span></Link>
                </li>
                <li>
                  <Link to="/semester" state={{ collaps: 'induk', activ: '/semester' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/semester' ? 'active' : ''}`}><FaStripeS /> <span className='text-sm'>Semester</span></Link>
                </li>
                <li>
                  <Link to="/dosen" state={{ collaps: 'induk', activ: '/dosen' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/dosen' || active == '/dosen' ? 'active' : ''}`}><FaChalkboardTeacher /> <span className='text-sm'>Dosen</span></Link>
                </li>
                <li>
                  <Link to="/mahasiswa" state={{ collaps: 'induk', activ: '/mahasiswa' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/mahasiswa' || active == '/mahasiswa' ? 'active' : ''}`}><FaUserGraduate /> <span className='text-sm'>Mahasiswa</span></Link>
                </li>
                <li>
                  <Link to="/ruang" state={{ collaps: 'induk', activ: '/ruang' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/ruang' ? 'active' : ''}`}><SiHomeassistantcommunitystore /> <span className='text-sm'>Ruang</span></Link>
                </li>
              </ul>
            </details>
          }

        </li>
        <li>
          {collap == 'kuliah' ?
            <details open>
              <summary className='text-[#F5F5F5]'><FaCopy />Perkuliahan</summary>
              <ul className='gap-2'>
                <li>
                  <Link to="/setmhs" state={{ collaps: 'kuliah', activ: '/setmhs' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/setmhs' ? 'active' : ''}`}><FaNetworkWired /> <span className='text-sm'>Set MHS Persemester</span></Link>
                </li>
                <li>
                  <Link to="/pembimbingakademik" state={{ collaps: 'kuliah', activ: '/pembimbingakademik' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/pembimbingakademik' || active == '/pembimbingakademik' ? 'active' : ''}`}><FaHandHolding /><span className='text-sm'>Pembimbing Akademik</span></Link>
                </li>
                <li>
                  <Link to="/studimhs" state={{ collaps: 'kuliah', activ: '/studimhs' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/studimhs' || active == '/studimhs' ? 'active' : ''}`}><FaFileAlt /><span className='text-sm'>Studi Mahasiswa</span></Link>
                </li>
                {/* <li>
                  <Link to="/pengajuanstudi" state={{ collaps: 'kuliah', activ: '/pengajuanstudi' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/pengajuanstudi' || active == '/pengajuanstudi' ? 'active' : ''}`}><FaFileAlt /><span className='text-sm'>Pengajuan Studi</span></Link>
                </li> */}
                <li>
                  <Link to="/kategorinilai" state={{ collaps: 'kuliah', activ: '/kategorinilai' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/kategorinilai' ? 'active' : ''}`}><FaFileSignature /> <span className='text-sm'>Kategori Nilai</span></Link>
                </li>
                <li>
                  <Link to="/matakuliah" state={{ collaps: 'kuliah', activ: '/matakuliah' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/matakuliah' || active == '/matakuliah' ? 'active' : ''}`}><FaBook /> <span className='text-sm'>Mata Kuliah</span></Link>
                </li>
                <li>
                  <Link to='/sebaran' state={{ collaps: 'kuliah', activ: '/sebaran' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/sebaran' ? 'active' : ''}`}><FaTh /> <span className='text-sm'>Sebaran Mata Kuliah</span></Link>
                </li>
                <li>
                  <Link to="/krs" state={{ collaps: 'kuliah', activ: '/krs' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/krs' ? 'active' : ''}`}><FaTasks /> <span className='text-sm'>Kartu Rencana Studi</span></Link>
                </li>
                <li>
                  <Link to="/kelas" state={{ collaps: 'kuliah', activ: '/kelas' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/kelas' || active == '/kelas' ? 'active' : ''}`}><SiOpslevel /> <span className='text-sm'>Kelas Kuliah</span></Link>
                </li>
                <li>
                  <Link to="/jadwalkuliah" state={{ collaps: 'kuliah', activ: '/jadwalkuliah' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/jadwalkuliah' || active == '/jadwalkuliah' ? 'active' : ''}`}><FaBusinessTime /> <span className='text-sm'>Jadwal Kuliah</span></Link>
                </li>
                <li>
                  <Link to="/presensi/dosen" state={{ collaps: 'kuliah', activ: '/presensi' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/presensi/dosen' || location.pathname == '/presensi/validasi' || location.pathname == '/presensi/rekapbulanan' || location.pathname == '/presensi/rekappersemester' || location.pathname == '/presensi' || active == '/presensi' ? 'active' : ''} even:bg-[#287155]`}><FaChalkboardUser /> <span className='text-sm'>Presensi</span></Link>
                </li>
                <li>
                  <Link to="/penilaian" state={{ collaps: 'kuliah', activ: '/penilaian' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/penilaian' || active == '/penilaian' ? 'active' : ''}`}><FaFileSignature /> <span className='text-sm'>Penilaian Mahasiswa</span></Link>
                </li>
                <li>
                  <Link to="/khs" state={{ collaps: 'kuliah', activ: '/khs' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/khs' || active == '/khs' ? 'active' : ''} even:bg-[#287155]`}><FaAddressBook /> <span className='text-sm'>Kartu Hasil Studi</span></Link>
                </li>
                <li>
                  <Link to="/pengumuman" state={{ collaps: 'kuliah', activ: '/pengumuman' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/pengumuman' || active == '/pengumuman' ? 'active' : ''} even:bg-[#287155]`}><FaAddressBook /> <span className='text-sm'>Pengumuman</span></Link>
                </li>
                <li>
                  <Link to="/pedoman" state={{ collaps: 'kuliah', activ: '/pedoman' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/pedoman' || active == '/pedoman' ? 'active' : ''} even:bg-[#287155]`}><SiFoursquarecityguide /> <span className='text-sm'>Pedoman Akademik</span></Link>
                </li>
              </ul>
            </details> :
            <details>
              <summary className='text-[#F5F5F5]'><FaCopy />Perkuliahan</summary>
              <ul className='gap-2'>
                <li>
                  <Link to="/setmhs" state={{ collaps: 'kuliah', activ: '/setmhs' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/setmhs' ? 'active' : ''}`}><FaNetworkWired /> <span className='text-sm'>Set MHS Persemester</span></Link>
                </li>
                <li>
                  <Link to="/pembimbingakademik" state={{ collaps: 'kuliah', activ: '/pembimbingakademik' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/pembimbingakademik' || active == '/pembimbingakademik' ? 'active' : ''}`}><FaHandHolding /><span className='text-sm'>Pembimbing Akademik</span></Link>
                </li>
                <li>
                  <Link to="/studimhs" state={{ collaps: 'kuliah', activ: '/studimhs' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/studimhs' || active == '/studimhs' ? 'active' : ''}`}><FaFileAlt /><span className='text-sm'>Studi Mahasiswa</span></Link>
                </li>
                {/* <li>
                  <Link to="/pengajuanstudi" state={{ collaps: 'kuliah', activ: '/pengajuanstudi' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/pengajuanstudi' || active == '/pengajuanstudi' ? 'active' : ''}`}><FaFileAlt /><span className='text-sm'>Pengajuan Studi</span></Link>
                </li> */}
                <li>
                  <Link to="/kategorinilai" state={{ collaps: 'kuliah', activ: '/kategorinilai' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/kategorinilai' ? 'active' : ''}`}><FaFileSignature /> <span className='text-sm'>Kategori Nilai</span></Link>
                </li>
                <li>
                  <Link to="/matakuliah" state={{ collaps: 'kuliah', activ: '/matakuliah' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/matakuliah' || active == '/matakuliah' ? 'active' : ''}`}><FaBook /> <span className='text-sm'>Mata Kuliah</span></Link>
                </li>
                <li>
                  <Link to='/sebaran' state={{ collaps: 'kuliah', activ: '/sebaran' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/sebaran' ? 'active' : ''}`}><FaTh /> <span className='text-sm'>Sebaran Mata Kuliah</span></Link>
                </li>
                <li>
                  <Link to="/krs" state={{ collaps: 'kuliah', activ: '/krs' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/krs' ? 'active' : ''}`}><FaTasks /> <span className='text-sm'>Kartu Rencana Studi</span></Link>
                </li>
                <li>
                  <Link to="/kelas" state={{ collaps: 'kuliah', activ: '/kelas' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/kelas' || active == '/kelas' ? 'active' : ''}`}><SiOpslevel /> <span className='text-sm'>Kelas Kuliah</span></Link>
                </li>
                <li>
                  <Link to="/jadwalkuliah" state={{ collaps: 'kuliah', activ: '/jadwalkuliah' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/jadwalkuliah' || active == '/jadwalkuliah' ? 'active' : ''}`}><FaBusinessTime /> <span className='text-sm'>Jadwal Kuliah</span></Link>
                </li>
                <li>
                  <Link to="/presensi/dosen" state={{ collaps: 'kuliah', activ: '/presensi' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/presensi/dosen' || location.pathname == '/presensi/validasi' || location.pathname == '/presensi/rekapbulanan' || location.pathname == '/presensi/rekappersemester' || location.pathname == '/presensi' || active == '/presensi' ? 'active' : ''} even:bg-[#287155]`}><FaChalkboardUser /> <span className='text-sm'>Presensi</span></Link>
                </li>
                <li>
                  <Link to="/penilaian" state={{ collaps: 'kuliah', activ: '/penilaian' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/penilaian' || active == '/penilaian' ? 'active' : ''}`}><FaFileSignature /> <span className='text-sm'>Penilaian Mahasiswa</span></Link>
                </li>
                <li>
                  <Link to="/khs" state={{ collaps: 'kuliah', activ: '/khs' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/khs' || active == '/khs' ? 'active' : ''} even:bg-[#287155]`}><FaAddressBook /> <span className='text-sm'>Kartu Hasil Studi</span></Link>
                </li>
                <li>
                  <Link to="/pengumuman" state={{ collaps: 'kuliah', activ: '/pengumuman' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/pengumuman' || active == '/pengumuman' ? 'active' : ''} even:bg-[#287155]`}><FaAddressBook /> <span className='text-sm'>Pengumuman</span></Link>
                </li>
                <li>
                  <Link to="/pedoman" state={{ collaps: 'kuliah', activ: '/pedoman' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/pedoman' || active == '/pedoman' ? 'active' : ''} even:bg-[#287155]`}><SiFoursquarecityguide /> <span className='text-sm'>Pedoman Akademik</span></Link>
                </li>
              </ul>
            </details>
          }
        </li>
        {user && user.data.role == 'admin' ?
          <li>
            {collap == 'user' ?
              <details open>
                <summary className='text-[#F5F5F5]'><FaUsers />Lainnya</summary>
                <ul className='gap-2'>
                  <li>
                    <Link to="/rfidmahasiswa" state={{ collaps: 'user', activ: '/rfidmahasiswa' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/rfidmahasiswa' || active == '/rfidmahasiswa' ? 'active' : ''} even:bg-[#287155]`}><RiRfidFill /> <span className='text-sm'>RFID Mahasiswa</span></Link>
                  </li>
                  <li>
                    <Link to="/rfiddosen" state={{ collaps: 'user', activ: '/rfiddosen' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/rfiddosen' || active == '/rfiddosen' ? 'active' : ''} even:bg-[#287155]`}><RiRfidFill /> <span className='text-sm'>RFID Dosen</span></Link>
                  </li>
                  <li>
                    <Link to="/users" state={{ collaps: 'user', activ: '/users' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/users' ? 'active' : ''}`}><FaUsers /> <span className='text-sm'>Users</span></Link>
                  </li>
                </ul>
              </details> :
              <details>
                <summary className='text-[#F5F5F5]'><FaUsers />Lainnya</summary>
                <ul className='gap-2'>
                  <li>
                    <Link to="/rfidmahasiswa" state={{ collaps: 'user', activ: '/rfidmahasiswa' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/rfidmahasiswa' || active == '/rfidmahasiswa' ? 'active' : ''} even:bg-[#287155]`}><RiRfidFill /> <span className='text-sm'>RFID Mahasiswa</span></Link>
                  </li>
                  <li>
                    <Link to="/rfiddosen" state={{ collaps: 'user', activ: '/rfiddosen' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/rfiddosen' || active == '/rfiddosen' ? 'active' : ''} even:bg-[#287155]`}><RiRfidFill /> <span className='text-sm'>RFID Dosen</span></Link>
                  </li>
                  <li>
                    <Link to="/users" state={{ collaps: 'user', activ: '/users' }} className={`text-[#F5F5F5] rounded-md text-sm ${location.pathname == '/users' ? 'active' : ''}`}><FaUsers /> <span className='text-sm'>Users</span></Link>
                  </li>
                </ul>
              </details>
            }
          </li> : ""
        }

      </ul>
    </div>
  )
}

export default Sidebar