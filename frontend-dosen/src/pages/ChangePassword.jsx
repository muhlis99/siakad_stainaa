import React, { useState, useEffect } from 'react'
import logo from "../assets/images/stainaa.png"
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { ResetPass, reset } from "../features/authSlice"
import Swal from 'sweetalert2'

const ChangePassword = () => {
    const [id, setId] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { user, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        setId(location.state.id);
    }, [location])

    useEffect(() => {
        if (user || isSuccess) {
            Swal.fire({
                title: user.message,
                icon: 'success'
            }).then(() => {
                navigate("/")
            })
        }
        dispatch(reset())
    }, [user, isSuccess, navigate, message, dispatch])

    const Auth = (e) => {
        e.preventDefault()
        if (newPass == 0) {
            Swal.fire({
                title: 'Password Baru Kosong!',
                icon: 'error'
            })
        } else if (confirmPass == 0) {
            Swal.fire({
                title: 'Konfirmasi Password Kosong!',
                icon: 'error'
            })
        } else if (newPass != confirmPass) {
            Swal.fire({
                title: 'Konfirmasi Password tidak sama!',
                icon: 'error'
            })
        } else {
            dispatch(ResetPass({ id, newPass, confirmPass }))
        }
    }


    return (
        <div className='min-h-screen font-sans'>
            <div className='bg-[#2D7F5F] w-full py-16 rounded-b-[50px]'>
                <div className='mx-auto w-1/2 lg:w-1/3 flex gap-2 lg:gap-4 content-center justify-center'>
                    <div className='my-auto'>
                        <img src={logo} width={90} alt="" />
                    </div>
                    <div className='relative'>
                        <h1 className='block text-3xl lg:text-6xl font-bold tracking-widest text-white'>SIAKAD</h1>
                        <p className="text-[8px] lg:text-[16px] tracking-wider absolute top-8 lg:top-14 text-white">STAI NURUL ABROR AL-ROBBANIYIN</p>
                    </div>
                </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3 mx-auto flex justify-center relative -top-10'>
                <div className='w-full bg-white shadow-xl rounded-[20px] px-4 py-8'>
                    <form onSubmit={Auth}>
                        <div className='text-center mb-3'>
                            <p className='text-lg'>Reset Password anda</p>
                        </div>
                        <div className='mb-3'>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <input
                                    type="password"
                                    value={newPass}
                                    onChange={(e) => setNewPass(e.target.value)}
                                    className='block w-full rounded-lg border py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-[#DBDBDB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#DBDBDB] sm:text-sm sm:leading-6'
                                    placeholder='Password Baru'
                                />
                            </div>
                        </div>
                        <div className='mb-10'>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <input
                                    type="password"
                                    value={confirmPass}
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                    className='block w-full rounded-lg border py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-[#DBDBDB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#DBDBDB] sm:text-sm sm:leading-6'
                                    placeholder='Konfirmasi Password baru'
                                />
                            </div>
                        </div>
                        <div className="flex gap-9 justify-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-8 rounded">
                                Simpan
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-8 rounded">
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword