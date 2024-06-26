import React, { useState, useEffect } from 'react'
import stainaa from "../assets/images/stainaacover.png"
import { useDispatch, useSelector } from "react-redux"
import { LoginUser, LogOut, reset } from "../features/authSlice"
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FaUserCircle, FaEyeSlash, FaEye } from "react-icons/fa"
import "../index.css"
import { Circles } from "react-loader-spinner"

const Login = () => {
    const [name, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isVisible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
        }, 500);
    }, [])

    useEffect(() => {
        if (user || isSuccess) {
            setLoad(false)
            if (user.role == 'admin' && user.role == 'bauak' && user.role == 'operator') {
                Swal.fire({
                    title: 'Mohon Login dengan akun anda',
                    icon: 'error'
                }).then(() => {
                    dispatch(LogOut())
                    dispatch(reset())
                })
            } else if (user.role == 'dosen' || user.role == 'mahasiswa') {
                Swal.fire({
                    title: user.message,
                    icon: 'success'
                }).then(() => {
                    navigate("/dashboard")
                })
            }
        }
        dispatch(reset())
        if (isError) {
            setLoad(false)
            Swal.fire({
                title: message,
                icon: 'error'
            })
        }
    }, [user, isSuccess, isError, navigate, message, dispatch])

    const Auth = (e) => {
        setLoad(true)
        e.preventDefault()
        dispatch(LoginUser({ name, password }))
    }

    const toggle = () => {
        setVisible(!isVisible)
    }

    return (
        <div className="min-h-screen py-14">
            <title>Login</title>
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
                <div className="mx-auto w-full lg:w-2/3 lg:mt-16">
                    <div className="grid lg:grid-cols-2">
                        <div className='flex justify-center'>
                            <img src={stainaa} alt="" className='w-36 md:w-auto lg:w-56 mx-auto lg:ml-44' />
                        </div>
                        <div className='pt-2 px-3'>
                            <h2 className='text-3xl mb-3 text-[#2D7F5F] font-bold hidden md:block md:mt-14 lg:block lg:mt-12'>SELAMAT DATANG</h2>
                            <p className='text-gray-500 hidden md:block md:mb-4 lg:block'>Sistem Informasi Akademik Sekolah Tinggi <br />Agama Islam Nurul Abror Al-Robbaniyin</p>
                            <form onSubmit={Auth} className='w-full lg:w-2/3'>
                                <div className='mb-4'>
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            id='username'
                                            value={name}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className='block w-full rounded-lg border py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-[#2d8659] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                            placeholder='Username Anda'
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center bg-[#2d8659] rounded-r-lg text-white px-3">
                                            {<FaUserCircle />}
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <input
                                            type={!isVisible ? "password" : "text"}
                                            id='password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className='block w-full rounded-lg border py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-[#2d8659] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                            placeholder='Password Anda'
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center bg-[#2d8659] rounded-r-lg text-white px-3 cursor-pointer" onClick={toggle}>
                                            {isVisible ? <FaEyeSlash /> : <FaEye />}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 mb-4 float-right">
                                    <span className='text-xs'>
                                        <Link to="/forgot" className='text-gray-500'>Forgot Password ?</Link>
                                    </span>
                                </div>
                                <div>
                                    <button type='submit' className='w-full bg-[#2D8659] p-2 rounded-md text-white'>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}

export default Login