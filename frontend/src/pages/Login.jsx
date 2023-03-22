import React from 'react'
import stainaa from "../assets/img/stainaa.png";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="min-h-screen py-24">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row w-8/12 mx-auto overflow-hidden">
                    <div className="w-full lg:w-1/2 flex flex-col bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${stainaa})` }}></div>
                    <div className="w-full lg:w-1/2 py-16 px-12">
                        <h2 className='text-3xl mb-3 text-[#2D7F5F] font-bold'>WELCOME BACK</h2>
                        <p className='text-gray-500'>Sistem Akademik Sekolah Tinggi <br />Agama Islam Nurul Abror Al-Robbaniyin</p>
                        <form>
                            <div className="mt-5">
                                <input type="text" placeholder='Username Anda' className='border border-[#2D7F5F] py-2 px-2 w-full rounded-xl' />
                            </div>
                            <div className="mt-5">
                                <input type="password" placeholder='Password Anda' className='border border-[#2D7F5F] py-2 px-2 w-full rounded-xl' />
                            </div>
                            <div className="mt-2 mb-4 float-right">
                                <Link to="/forgot" className='text-gray-500'>Forgot Password</Link>
                            </div>
                            <div className="mt-5">
                                <button type='button' className='bg-[#2D7F5F] py-2 px-2 w-full rounded-xl text-white font-bold'>LOGIN</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login