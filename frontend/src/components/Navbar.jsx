import React from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Avatar from "../assets/img/man.png"
import { LogOut, reset } from "../features/authSlice"
import Swal from 'sweetalert2'
import { RiLogoutCircleLine } from "react-icons/ri";

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const logOut = () => {
    Swal.fire({
      title: "Anda Yakin Untuk Keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(LogOut())
        dispatch(reset())
        navigate("/login")
      }
    })
  }

  return (
    <div className="navbar bg-[#F5F5F5] shadow-md min-h-min py-1 sticky z-40 top-0">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div>
      <div className="flex-1">
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end drop-shadow-lg">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-8 rounded-full">
              <img src={Avatar} />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-60">

            <li>
              <div className='flex p-2 border-b'>
                <div className="avatar">
                  <div className="w-8 rounded">
                    <img src={Avatar} />
                  </div>
                </div>
                <div className=' ml-5'>
                  <a className='capitalize'>{user && <span>{user.data.username}</span>}</a><br />
                  <a className='text-[10px]'>{user && <span>{user.data.email}</span>}</a>
                </div>
              </div>
            </li>
            <li><button onClick={logOut}><RiLogoutCircleLine />log out</button></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar