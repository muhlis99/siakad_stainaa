import React, { useState, useEffect } from 'react'
import stainaa from "../assets/img/stainaa.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import Swal from "sweetalert2";

const Login = () => {
    const [name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (user || isSuccess) {
            Swal.fire({
                title: user.message,
                icon: "success"
            }).then(() => {
                navigate("/dashboard");
            });
        }
        dispatch(reset());
        if (isError) {
            Swal.fire({
                title: message,
                icon: 'error'
            })
        }
    }, [user, isSuccess, isError, dispatch, navigate])

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({ name, password }));
    }

    return (
        <div className="min-h-screen py-24">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row w-8/12 mx-auto overflow-hidden">
                    <div className="w-full lg:w-1/2 flex flex-col bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${stainaa})` }}></div>
                    <div className="w-full lg:w-1/2 py-16 px-12">
                        <h2 className='text-3xl mb-3 text-[#2D7F5F] font-bold'>WELCOME BACK</h2>
                        <p className='text-gray-500'>Sistem Akademik Sekolah Tinggi <br />Agama Islam Nurul Abror Al-Robbaniyin</p>
                        <form onSubmit={Auth}>
                            <div className="mt-5">
                                <input
                                    type="text"
                                    className='border border-[#2d8659] py-2 px-2 w-full rounded-xl'
                                    value={name}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder='Username Anda'
                                />
                            </div>
                            <div className="mt-5">
                                <input
                                    type="password"
                                    className='border border-[#2d8659] py-2 px-2 w-full rounded-xl'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Password Anda'
                                />
                                <input type="text" placeholder='Username Anda' className='border border-[#2D7F5F] py-2 px-2 w-full rounded-xl' />
                            </div>
                            <div className="mt-2 mb-4 float-right">
                                <Link to="/forgot" className='text-gray-500'>Forgot Password</Link>
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