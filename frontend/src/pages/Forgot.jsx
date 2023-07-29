import React, { useState } from 'react'
import stainaa from "../assets/img/stainaa.png"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import Swal from "sweetalert2"

const Forgot = () => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const kirimEmail = async (e) => {
        e.preventDefault()
        try {
            await axios.post('v1/login/forgot', {
                email: email

            }).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate('/verification')
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
        <div>
            <title>Forgot Password</title>
            <div className="w-full min-w-min h-56 bg-[#2D7F5F] lg:rounded-b-[50px] pt-12">
                <div className="w-full flex gap-9 justify-center">
                    <img src={stainaa} alt="" className='w-24 relative rounded-full' />
                    <div>
                        <h1 className='text-white lg:text-6xl sm:text-3xl font-bold tracking-widest'>SIAKAD</h1>
                        <p className="text-sm tracking-wider text-white">STAI NURUL ABROR AL-ROBBANIYIN</p>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center relative mx-auto -top-10'>
                <div className="card w-[500px] bg-base-100 shadow-xl rounded-[30px]">
                    <div className="card-body text-center">
                        <form onSubmit={kirimEmail}>
                            <p className='text-lg'>Untuk Mengganti Password</p>
                            <p className='text-lg mt-2'>Silakan Masukkan Email Aktif Anda</p>
                            <div className="w-full mt-6">
                                <label htmlFor="email" className='text-xl'>Email</label>
                                <input
                                    type="email"
                                    id='email'
                                    placeholder='example@gmail.com'
                                    className='ml-2 input input-md input-bordered w-80'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="card-actions justify-center gap-5 mt-9">
                                <button className="btn btn-primary btn-sm w-32">Kirim</button>
                                <button type='button' onClick={batalkan} className="btn btn-error btn-sm w-32">Batal</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgot