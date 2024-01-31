import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../Loading'
import { Link, useLocation } from "react-router-dom"
import Swal from 'sweetalert2'
import moment from 'moment'
import icon from "../../assets/img/wifi.png"
import { FaReply } from "react-icons/fa"

const FormPresensi = () => {
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const [kodeRfid, setKodeRfid] = useState()
    let time = new Date().toLocaleTimeString()
    const [jam, setJam] = useState(time)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        console.log(location.state)
    }, [location])

    const simpanAbsenDosen = async (e) => {
        e.preventDefault()
        try {
            await axios.post('v1/presensiDosen/presensiByRfid', {
                codeRfid: kodeRfid,
                tgl: location.state.tgl,
            }).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setKodeRfid("")
                })
            })
        } catch (error) {
            Swal.fire({
                title: 'Tidak dapat melakukan absen',
                icon: 'error',
                text: error.response.data.message,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const updateJam = () => {
        time = new Date().toLocaleTimeString()
        setJam(time)
    }

    setInterval(updateJam)

    return (
        <div className='mt-2 container'>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Presensi</h1>
                <h1 className='text-xl font-bold'>{location.state.mom} {jam}</h1>
                {/* <h1 className='text-xl font-bold'></h1> */}
            </section>
            <section>
                <div className='flex justify-center'>
                    <img src={icon} width={300} alt="" />
                </div>
                <div className='flex justify-center'>
                    <Link to='/presensi' className='bg-[#DC3545] py-1 px-2 rounded text-white inline-flex items-center gap-1 no-underline'><FaReply /> Keluar</Link>
                </div>
                <form onSubmit={simpanAbsenDosen}>
                    <input type="text" value={kodeRfid} className='bg-[#EDEDED] focus:outline-none focus:ring-transparent focus:border-transparent caret-transparent text-[#EDEDED]' onChange={(e) => setKodeRfid(e.target.value)} autoFocus />
                </form>
            </section>
        </div>
    )
}

export default FormPresensi