import React, { useState, useEffect } from 'react'
import logo from "../assets/images/stainaa.png"
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { ResetPass, reset } from "../features/authSlice"
import Swal from 'sweetalert2'
import { Circles } from "react-loader-spinner";

const ChangePassword = () => {
    const [id, setId] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { user, isSuccess, message } = useSelector((state) => state.auth)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setId(location.state.id);
    }, [location])

    useEffect(() => {
        if (user || isSuccess) {
            Swal.fire({
                title: user.message,
                icon: 'success'
            }).then(() => {
                navigate("/dashboard")
            })
        }
        dispatch(reset())
    }, [user, isSuccess, navigate, message, dispatch])

    const Auth = (e) => {
        e.preventDefault()
        setLoad(true)
        if (newPass == 0) {
            setLoad(false)
            Swal.fire({
                title: 'Password Baru Kosong!',
                icon: 'error'
            })
        } else if (confirmPass == 0) {
            setLoad(false)
            Swal.fire({
                title: 'Konfirmasi Password Kosong!',
                icon: 'error'
            })
        } else if (newPass != confirmPass) {
            setLoad(false)
            Swal.fire({
                title: 'Konfirmasi Password tidak sama!',
                icon: 'error'
            })
        } else {
            dispatch(ResetPass({ id, newPass, confirmPass }))
        }
    }

    const batalkan = () => {
        Swal.fire({
            title: "Yakin untuk membatalkan?",
            text: "Anda tidak dapat mengembalikan ini",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, batalkan!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Dibatalkan",
                    icon: "success"
                }).then(() => {
                    navigate('/login')
                });
            }
        })
    }


    return (
        <div className='min-h-screen font-sans'>
            <title>Atur Password</title>
            {load ?
                <div className='h-100 absolute z-50 left-0 right-0 top-0 w-full bg-[#E9EAE1] flex justify-center items-center' style={{ height: '100%' }}>
                    <div className=''>
                        <Circles
                            height="80"
                            width="80"
                            color="#000"
                            ariaLabel="circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>
                </div>
                :
                <>
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
                                    <button type='button' onClick={batalkan} className="bg-red-500 hover:bg-red-700 text-white py-1 px-8 rounded">
                                        Batal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default ChangePassword