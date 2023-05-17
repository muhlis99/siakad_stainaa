import React from 'react'
import stainaa from "../assets/img/stainaa.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <ul className="menu w-60 bg-[#2D7F5F]">
        <div className="flex gap-3 w-full h-16 mb-2 pt-1 justify-center shadow-md">
          <div className="avatar mt-1 rounded-full shadow-lg h-12 ">
            <div className="w-12 h-12 rounded-full">
              <img src={stainaa} />
            </div>
          </div>
          <div className="text-center text-white">
            <Link to="/dashboard">
              <p className='text-2xl font-bold '>SIAKAD</p>
              <p className='text-[8px]'>STAI NURUL ABROR AL-ROBBANIYIN</p>
            </Link>
          </div>
        </div>
        <li><Link to="/dashboard" className='text-white'><span className='font-bold text-sm'>Dashboard</span></Link></li>
        <li><Link to="/jenjang" className='text-white'><span className='font-bold text-sm'>Jenjang Pendidikan</span></Link></li>
        <li><Link to="/fakultas" className='text-white'><span className='font-bold text-sm'>Fakultas</span></Link></li>
        <li><Link to="/prodi" className='text-white'><span className='font-bold text-sm'>Prodi</span></Link></li>
        <li><Link to="/mahasiswa" className='text-white'><span className='font-bold text-sm'>Mahasiswa</span></Link></li>
        <li><Link className='text-white'><span className='font-bold text-sm'>Dosen</span></Link></li>
        <li><Link className='text-white'><span className='font-bold text-sm'>Kategori Nilai</span></Link></li>
        <li><Link className='text-white'><span className='font-bold text-sm'>Kelas</span></Link></li>
        <li><Link className='text-white'><span className='font-bold text-sm'>Ruang</span></Link></li>
        <li><Link className='text-white'><span className='font-bold text-sm'>Semester</span></Link></li>
        <li><Link className='text-white'><span className='font-bold text-sm'>Tahun Ajaran</span></Link></li>
        <li><Link className='text-white'><span className='font-bold text-sm'>Penjadwalan</span></Link></li>
        <li><Link className='text-white'><span className='font-bold text-sm'>KRS</span></Link></li>
        <li><Link className='text-white'><span className='font-bold text-sm'>KHS</span></Link></li>
        <li><Link className='text-white'><span className='font-bold text-sm'>Ploting Kelas</span></Link></li>
        <li><Link className='text-white'><span className='font-bold text-sm'>Users</span></Link></li>
      </ul>

    </div>
  )
}

export default Sidebar