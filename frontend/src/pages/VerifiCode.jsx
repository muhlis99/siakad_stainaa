import React, { useState, useEffect } from 'react'
import stainaa from "../assets/img/stainaa.png"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import axios from 'axios'

const VerifiCode = () => {
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
        <div>
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
                        <form onSubmit={Auth}>
                            <p className='text-lg'>Kode Verifikasi telah dikirim ke Email anda</p>
                            <div className="w-full mt-6">
                                <label htmlFor="number" className='text-xl'>Kode</label>
                                <input
                                    type="number"
                                    id='number'
                                    className='ml-2 input input-md input-bordered w-80'
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>
                            <div className="card-actions justify-center gap-5 mt-9">
                                <button className="btn btn-default btn-sm w-32">Kirim</button>
                                <Link className="btn btn-danger btn-sm w-32">Batal</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifiCode