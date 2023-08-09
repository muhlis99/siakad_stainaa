import React, { useState, useEffect } from 'react'
import stainaa from "../assets/img/stainaacover.png"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { LoginUser, reset } from "../features/authSlice"
import Swal from "sweetalert2"
import { FaEyeSlash, FaEye, FaUserCircle } from "react-icons/fa"

const Login = () => {
    const [name, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)
    const [isVisible, setVisible] = useState(false)


    useEffect(() => {
        if (user || isSuccess) {
            if (user.message == "selamat datang") {
                navigate("/dashboard")
            } else {
                Swal.fire({
                    title: user.message,
                    icon: "success"
                }).then(() => {
                    navigate("/dashboard")
                })
            }
        }
        dispatch(reset())
        if (isError) {
            Swal.fire({
                title: message,
                icon: 'error'
            })
        }
    }, [user, isSuccess, navigate, message, isError, dispatch])

    const Auth = (e) => {
        e.preventDefault()
        dispatch(LoginUser({ name, password }))
    }


    const toggle = () => {
        setVisible(!isVisible)
    }

    return (
        <div className="min-h-screen py-24">
            <title>Login</title>
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row w-3/5 mx-auto overflow-hidden">
                    <div className="w-full lg:w-1/2 flex flex-col bg-no-repeat bg-50% bg-center" style={{ backgroundImage: `url(${stainaa})` }}></div>
                    <div className="w-full lg:w-1/2 py-16 px-12">
                        <h2 className='text-3xl mb-3 text-[#2D7F5F] font-bold'>SELAMAT DATANG</h2>
                        <p className='text-gray-500'>Sistem Akademik Sekolah Tinggi <br />Agama Islam Nurul Abror Al-Robbaniyin</p>
                        <form onSubmit={Auth}>
                            <div className="mt-5 form-control">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className='input input-sm border border-[#2d8659] py-2 px-2 w-full rounded-xl'
                                        value={name}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder='Username Anda'
                                    />
                                    <span className='w-9 p-0 bg-success text-white'>
                                        {<FaUserCircle className='mx-auto' />}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-5 form-control">
                                <div className="input-group">
                                    <input
                                        type={!isVisible ? "password" : "text"}
                                        className='input input-sm border border-[#2d8659] py-2 px-2 w-full rounded-xl'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Password Anda'
                                    />
                                    <button type='button' class="btn btn-sm btn-square btn-success" onClick={toggle}>
                                        {isVisible ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2 mb-4 float-right">
                                <span className='text-xs'>
                                    <Link to="/forgot" className='text-gray-500'>Forgot Password ?</Link>
                                </span>
                            </div>
                            <div className="mt-5">
                                <button type='submit' className='bg-[#2d8659] py-2 px-2 w-full rounded-xl text-white font-bold'>LOGIN</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login