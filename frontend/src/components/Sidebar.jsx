import React from 'react'
import stainaa from "../assets/img/stainaa.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <ul className="menu w-60 bg-[#2D7F5F] opacity-95">
        <div className="flex gap-3 w-full h-16 mb-2 pt-1 justify-center shadow-md">
          <div className="avatar mt-1 rounded-full shadow-lg h-12 ">
            <div className="w-12 h-12 rounded-full">
              <img src={stainaa} />
            </div>
          </div>
          <div className="text-center text-white">
            <Link >
              <p className='text-2xl font-bold '>SIAKAD</p>
              <p className='text-[8px]'>STAI NURUL ABROR AL-ROBBANIYIN</p>
            </Link>
          </div>
        </div>
        <li><Link to="/dashboard" className='text-white'>Sidebar Item 1</Link></li>

      </ul>

    </div>
  )
}

export default Sidebar