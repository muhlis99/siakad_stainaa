import React, { useState } from 'react'
import logo from "../assets/images/stainaa.png"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Swal from 'sweetalert2'

const Verification = () => {
    const [code, setCode] = useState("")
    const navigate = useNavigate()

    const Auth = async (e) => {
        e.preventDefault()
        try {
            await axios.post('v1/login/verify', {
                code: code,
            }).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate("/changepass", { state: { id: response.data.id } })
                });
            })
        } catch (error) {
            if (error.response.data.message) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error"
                })
            } else {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
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
                        <div className='text-center'>
                            <p className='text-lg'>Kode Verifikasi telah dikirim ke Email anda</p>
                        </div>
                        <div className='mb-10'>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <input
                                    type="number"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className='block w-full rounded-lg border py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-[#DBDBDB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#DBDBDB] sm:text-sm sm:leading-6'
                                    placeholder='Kode Verifikasi'
                                />
                            </div>
                        </div>
                        <div className="flex gap-9 justify-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-8 rounded">
                                Kirim
                            </button>
                            <button type='button' className="bg-red-500 hover:bg-red-700 text-white py-1 px-8 rounded">
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Verification