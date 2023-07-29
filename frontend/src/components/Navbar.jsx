import React from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Avatar from "../assets/img/avatar.png"
import { LogOut, reset } from "../features/authSlice"
import Swal from 'sweetalert2'

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
        <span className="normal-case text-md font-bold text-[#2d8659]">Hello {user && user.data.username}, Welcome Back !</span>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-5 rounded-full">
              <img src={Avatar} />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {/* <li>
              <Link className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><Link>Settings</Link></li> */}
            <li><button onClick={logOut}>Keluar</button></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar